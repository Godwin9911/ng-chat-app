const mongoose = require('mongoose');
      Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  password: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;