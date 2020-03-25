const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Message = require('../models/MessageModel');
const User = require('../models/UserModel');
const Conversation = require('../models/ConversationModel');


const sendMessageViaSocket = (req, reply, reciepientId, newChat=true) => {
  const io = req.app.get('socketio')
  return io.emit(`message${reciepientId}`, {reply, newChat});
}

const getMessagesInConversation = (req, res, next) => { 
  // res.status(200).json({ conversation: req.params.conversationId });
  Message.find({ conversationId: req.params.conversationId })
    .select('createdAt body author')
    // .sort('createdAt')
    .populate({
      path: 'author',
      select: 'profile.firstName profile.lastName'
    })
    .exec(function(err, messages) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      res.status(200).json({ conversation: messages });
    });
}


// triggered from all contacts page
router.get('/check-conversation/:reciepient', async (req, res, next) => {
 const conversation = await Conversation.findOne({participants: { $all: [ req.user._id, req.params.reciepient] }});
  if (conversation ) {
    req.params.conversationId = conversation._id;
    getMessagesInConversation(req, res, next);
  } else {
    res.status(404).json({message: 'no messages'});
  }
});

// Get my active conversations -- TODO - sort by last sentng 
router.get('/conversations', (req, res, next) => {
  const { user } = req;
  Conversation.find({ participants: user })
    .sort('-createdAt')
    .select('_id participants')
    .populate({
      path: 'participants',
      match: { _id: { $ne: user } },
      select: "firstname lastname"
    })
    .exec(function(err, conversations) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      // Set up empty array to hold conversations + most recent message
      let fullConversations = [];
      conversations.forEach(async function(conversation) {
        const unreadCount = await Message.find({ 'conversationId': conversation._id, 'read': 'false' })
                                    .countDocuments().exec();

        Message.find({ 'conversationId': conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: "author",
            select: "firstname lastname"
          })
          .exec(function(err, message) {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
            fullConversations.push({ ...conversation.participants, message, unreadCount });
            if(fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations });
            }
          });
      });
  });
});

// Get messages in a conversation
router.get('/conversations/:conversationId', getMessagesInConversation);

// send message
router.post('/send/:reciepientId',[
  check('composedMessage').notEmpty()
  ], async (req, res, next) => {

  // try {

    //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // check if users has conversation
    const conversation = await Conversation.findOne({participants: { $all: [ req.user._id, req.params.reciepientId] }});
    if (conversation) {

      const reply = new Message({
        conversationId: conversation._id,
        body: req.body.composedMessage,
        author: req.user._id
      });
      reply.save(function(err, sentReply) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
        sendMessageViaSocket(req, reply, req.params.reciepientId, false);
        return res.status(200).json({ message: 'Reply successfully sent!', reply });
      });
      
    } else {
      const newConversation = new Conversation({
        participants: [req.user._id, req.params.reciepientId]
      });
      newConversation.save(function(err, newConversation) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
    
        const reply = new Message({
          conversationId: newConversation._id,
          body: req.body.composedMessage,
          author: req.user._id
        });
    
        reply.save(function(err, newMessage) {
          if (err) {
            res.send({ error: err });
            return next(err);
          }
          sendMessageViaSocket(req, reply, req.params.reciepientId, true);
          return res.status(200).json({ message: 'Conversation started!', conversationId: newConversation._id, reply });
        });
      });
    }

  /*} catch (e) {
    return res.status(500).json({message: e });
  }*/
});

/*

// post message in an existing conversation
router.post('/:conversationID', [
  check('composedMessage').notEmpty()
], (req, res, next) => {

  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.composedMessage,
    author: req.user._id
  });

  //Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  reply.save(function(err, sentReply) {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    res.status(200).json({ message: 'Reply successfully sent!' });
    return(next);
  });
});
*/

router.get('/users', async (req, res) => {
  const { user } = req;
  let users = await User.find({ email: { $ne: user.email } });
  res.status(200).json(users);
});

/*
router.post('/new/:reciepient', [
  check('composedMessage').notEmpty()
], (req, res, next) => {

  // TODO - check if conversation exist
  const conversation = new Conversation({
    participants: [req.user._id, req.params.reciepient]
  });

  conversation.save(function(err, newConversation) {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const message = new Message({
      conversationId: newConversation._id,
      body: req.body.composedMessage,
      author: req.user._id
    });

    message.save(function(err, newMessage) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
      return next();
    });
  });
});

*/


module.exports = router;