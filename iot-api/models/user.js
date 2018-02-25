const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  name: String,
  imageURL: String,
  boards: [{ type: Schema.ObjectId, ref: 'Board' }],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

module.exports.User = User;