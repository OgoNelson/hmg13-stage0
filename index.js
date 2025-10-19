const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userProfileController = require("./contoller/userProfile.controller");

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

//Home route
app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ status: "success", message: "MY HMG13 stage0 task" });
});

//Health check
app.get("/health", (req, res) => {
  return res.status(200).json({ status: "success", message: "OK" });
});

// GET /me endpoint
app.get("/me", userProfileController);

//listen to the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
