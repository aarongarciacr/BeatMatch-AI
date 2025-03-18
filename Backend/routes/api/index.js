const express = require("express");
const authRoutes = require("./auth/authRoutes");
const playlistRoutes = require("./playlist/playlist");
const searchRoutes = require("./search/search");
const discoverRoutes = require("./playlist/discover");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/playlists", playlistRoutes);
router.use("/search", searchRoutes);
router.use("/discover", discoverRoutes);

module.exports = router;
