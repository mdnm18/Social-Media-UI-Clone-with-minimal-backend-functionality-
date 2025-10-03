// server/models/Post.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    username: { type: String, required: true },
    avatarUrl: { type: String },
  },
  imageUrl: { type: String, required: true },
  caption: { type: String, required: true },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
