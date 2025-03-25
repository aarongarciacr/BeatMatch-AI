const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  spotifyId: { type: String, required: true },
  email: { type: String, required: true },
  display_name: { type: String, required: true },
  country: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  lastLogin: { type: Date, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
