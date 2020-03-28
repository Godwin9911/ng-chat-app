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
    successRedirect: '/api/auth/google/success',
    failureRedirect: '/api/auth/google/failure'
  }));

  
GoogleLoginRouter.get('/success', (req, res) => {
  const user = JSON.stringify({
    user: req.user
  });
  let responseHtml = `
    <html>
      <head>
        <title>Main</title>
      </head>
      <body>
        <p>Logging Into website, please wait...</p>
      </body>
      <script>
        window.opener.postMessage(${user}, '*');
        window.close();
      </script>
    </html>`
    res.status(200).send(responseHtml);
});

GoogleLoginRouter.get('/failure', (req, res) => {
  res.status(400).json({ message: 'Google Login failure' });
});

module.exports = GoogleLoginRouter;
