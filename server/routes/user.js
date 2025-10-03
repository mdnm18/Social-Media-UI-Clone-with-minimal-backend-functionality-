// server/routes/user.js
const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/userController");

router.route("/").get(getUserProfile);

module.exports = router;
