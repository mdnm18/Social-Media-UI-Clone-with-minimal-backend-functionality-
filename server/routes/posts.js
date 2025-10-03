// server/routes/posts.js
const express = require("express");
const router = express.Router();
const { getPosts, createPost } = require("../controllers/postController");

// Defines the routes for /api/posts
router.route("/").get(getPosts).post(createPost);

module.exports = router;
