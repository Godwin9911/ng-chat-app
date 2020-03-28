const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

//Load User Model
const User = require('../models/UserModel');
const Conversation = require('../models/ConversationModel');


module.exports = function(passport) {
  async function saveOrCreateNewUser(profile, theProvider, done) {
    let user = await User.findOne({ email: profile.email });
    if (!user) {
      user = new User();
      user.firstname = profile.given_name;
      user.lastname = profile.family_name;
      user.email = profile.email;
      user.picture = profile.picture;
      user.save();
      return done(null, user);
    }
    return done(null, user);
  }


  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      passReqToCallback: true,
      proxy: true
    },
    ((request, accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      saveOrCreateNewUser(profile, 'google', done);
    }))
  );

  passport.use(
    new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    // Match user
    User.findOne({email: email})
    .then(user => {
      if (!user) {
        return done(null, false, {message: 'That email is not registered'});
      }
      if(user.verified === false){
        return done(null, false, {message: 'Account not verified, check your mail or resend verification mail'});
      }
      //check verified status from here

      //Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err)
          throw err;

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'password Incorrrect'})
        }
      });
    });
  })
);
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  });
};
