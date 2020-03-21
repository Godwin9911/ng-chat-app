const moogoose = require('mongoose');

const ConversationSchema = new moogoose.Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = moogoose.model('Conversation', ConversationSchema);