const { reqAuth } = require("../../../utils/reqAuth");
const express = require("express");
const axios = require("axios");
const User = require("../../../models/User");

const router = express.Router();

const API_BASE_URL = "https://api.spotify.com/v1";

// GET users playlists
router.get("/", reqAuth, async (req, res) => {
  let headers = {
    Authorization: `Bearer ${req.session.access_token}`,
  };

  let response = await axios.get(`${API_BASE_URL}/me/playlists`, {
    headers: headers,
  });

  let playlists = response.data.items;
  return res.json(playlists);
});

//Create Playlist
router.post("/", reqAuth, async (req, res) => {
  try {
    const userSpotId = req.user.spotifyId;
    const user = await User.findOne({ spotifyId: userSpotId });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, please log in again." });
    }

    const headers = {
      Authorization: `Bearer ${user.accessToken}`,
      "Content-Type": "application/json",
    };

    const { name, description, public } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const playlistResponse = await axios.post(
      `${API_BASE_URL}/users/${userSpotId}/playlists`,
      { name, description, public },
      { headers }
    );

    res.json({
      message: "Playlist created successfully",
      plalist: playlistResponse.data,
    });
  } catch (error) {
    console.error("Error in create playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Change Playlist Details

module.exports = router;
