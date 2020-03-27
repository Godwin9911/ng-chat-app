/* eslint-disable no-underscore-dangle */
const express = require('express');
const passport = require('passport');

const GoogleLoginRouter = express.Router();

GoogleLoginRouter.get('/',
  passport.authenticate('google', {
    scope:
          ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email']
  }));

GoogleLoginRouter.get('/callback',
  passport.authenticate('google', {
    successRedirect: '/chat',
    failureRedirect: '/api/auth/google/failure'
  }));

  
GoogleLoginRouter.get('/success', (req, res) => {
  res.status(200).json(req.user);
});

GoogleLoginRouter.get('/failure', (req, res) => {
  res.status(400).json({ message: 'Google Login failure' });
});

module.exports = GoogleLoginRouter;
