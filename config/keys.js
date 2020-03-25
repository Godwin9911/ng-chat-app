if (process.env.NODE_ENV === 'production') {
  module.exports = {
    PORT: process.env.PORT,
    MongoURI: process.env.MONGO_URI,
  };
}

if ( process.env.NODE_ENV === 'development') {
  module.exports = {
    MongoURI:'mongodb://localhost:27017/ngchatapp',
    secret:'yoursecret'
  }
}
