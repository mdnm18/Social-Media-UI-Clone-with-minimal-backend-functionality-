// server/server.js
require("dotenv").config(); // Loads variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// --- Middleware ---
// Allows your frontend to make requests to this backend
app.use(cors());
// Allows the server to accept JSON in the body of requests
app.use(express.json());

// --- Database Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// --- Routes ---
// A simple test route to make sure the server is working
app.get("/", (req, res) => {
  res.send("API is running successfully!");
});
app.use("/api/posts", require("./routes/posts"));
app.use("/api/user", require("./routes/user"));

// --- Start the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
