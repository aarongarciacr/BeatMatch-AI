const express = require("express");
const router = express.Router();
const Playlist = require("../../../models/Playlist");
const { reqAuth } = require("../auth/authRoutes");

//Get Playlist to display on "Discover" page
router.get("/", async (req, res) => {
  try {
    const user = "Beatmatch-AI";
    const playlists = await Playlist.find({ userId: user });
    return res.json(playlists);
  } catch (error) {
    console.error("Error in get all playlists from database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
