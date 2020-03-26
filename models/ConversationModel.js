const moogoose = require('mongoose');

const ConversationSchema = new moogoose.Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
},{
  timestamps: true
});

module.exports = moogoose.model('Conversation', ConversationSchema);