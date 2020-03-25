const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;

//init app
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.set('socketio', io);

let socket_id = [];

// socket connection
io.on('connection', function (socket) {
  console.log('a user connected');
  socket_id.push(socket.id);
  if ( socket_id[0] === socket.id) {
    io.removeAllListeners('connection');
    console.log(socket_id);
  }
  socket.on('disconnect', function (){
    console.log('user disconnected');
  });
});

//passport Config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;

//connect to Mongo
mongoose.connect(db, {useNewUrlParser: true , useUnifiedTopology: true })
        .then(() => console.log('MongoDB Connected..'))
        .catch(err => console.log(err));

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

/*app.get('/', (req, res) => {
  res.send('Welcome to my NG_CHAT_APP api')
})
*/

// serve static assets in prod
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist', 'client')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'client', 'index.html'));
  });
}

http.listen(PORT, console.log(`server started on port ${PORT}`));