// server/controllers/postController.js
const Post = require("../models/Post");

// @desc    Get all posts
// @route   GET /api/posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ timestamp: -1 }); // Get newest first
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Create a post
// @route   POST /api/posts
exports.createPost = async (req, res) => {
  const { user, imageUrl, caption } = req.body;
  try {
    const newPost = new Post({
      user,
      imageUrl,
      caption,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
