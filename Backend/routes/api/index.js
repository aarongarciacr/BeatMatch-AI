const express = require("express");
const authRoutes = require("./auth/authRoutes");
const playlistRoutes = require("./playlist/playlist");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/playlists", playlistRoutes);

module.exports = router;
