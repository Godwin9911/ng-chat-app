const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/UserModel');

router.post('/register', (req, res) => {
    // return res.status(201).json(req.body);
    
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(403).json({ message: 'email already exists' });
      }
      const newUser = new User(req.body);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save();
          let { id, firstname, lastname, email } = newUser;
          return res.status(201).json({ id, firstname, lastname, email });
        });
      });
    });
});


router.post('/login', passport.authenticate('local', {
    failureRedirect: 'login',
    failureFlash: true
  }),
  (req, res, next) => {
    // let { id, firstname, lastname, email } = req.user
    res.status(200).json(req.user);
    return next();
  })
  .get('/login', (req, res) => {
    const message = req.flash('error');
    return res.status(401).json({ message });
  });


  router.route('/checkidentity')
  .get((req, res) => {
    res.locals.user = req.user || null;
    if (res.locals.user) return res.status(200).json(req.user);
    return res.status(404).json({ message: 'not logged In' });
  });

  router.route('/logout')
    .get((req, res) => {
      req.logout();
      res.status(200).json({ message: 'logout successfull' });
    });



module.exports = router;