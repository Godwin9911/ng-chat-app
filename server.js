const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

//init app
const app = express();

//passport Config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;

//connect to Mongo
mongoose.connect(db, {useNewUrlParser: true , useUnifiedTopology: true }).then(() => console.log('MongoDB Connected..')).catch(err => console.log(err));

//Bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Express Session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//routes
app.use('/api/user', require('./routes/usersRoute'));
app.use('/api/message', require('./routes/messagesRoute'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port ${PORT}`));