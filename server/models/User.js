// server/models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  bio: { type: String },
  avatarUrl: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
