// server/controllers/userController.js

// For now, we'll return a hardcoded user profile.
// Later, you could fetch this from the database.
exports.getUserProfile = async (req, res) => {
  try {
    res.json({
      username: "mdnayaj",
      bio: "CS student @ SRMIST | Full Stack Dev | Learning by building 🚀",
      avatarUrl: "https://i.pravatar.cc/150?u=mdnayaj",
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
