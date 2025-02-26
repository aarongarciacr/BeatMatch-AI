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
router.put("/:playlistId", reqAuth, async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    const { name, description, public } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const headers = {
      Authorization: `Bearer ${req.session.access_token}`,
      "Content-Type": "application/json",
    };

    const playlistResponse = await axios.put(
      `${API_BASE_URL}/playlists/${playlistId}`,
      { name, description, public },
      { headers }
    );

    return res.json({
      message: "Playlist updated successfully",
      playlist: playlistResponse.data,
    });
  } catch (error) {
    console.error("Error in update playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Get playlist tracks
router.get("/:playlistId/tracks", reqAuth, async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    const headers = {
      Authorization: `Bearer ${req.session.access_token}`,
    };

    const playlistResponse = await axios.get(
      `${API_BASE_URL}/playlists/${playlistId}/tracks`,
      { headers }
    );

    return res.json(playlistResponse.data);
  } catch (error) {
    console.error("Error in get playlist tracks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Add Tracks to Playlist
router.post("/:playlistId/tracks", reqAuth, async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    const { uris } = req.body;

    if (!uris) {
      return res.status(400).json({ message: "Uris are required" });
    }

    const headers = {
      Authorization: `Bearer ${req.session.access_token}`,
      "Content-Type": "application/json",
    };

    const playlistResponse = await axios.post(
      `${API_BASE_URL}/playlists/${playlistId}/tracks`,
      { uris },
      { headers }
    );

    return res.json({
      message: "Tracks added successfully",
      playlist: playlistResponse.data,
    });
  } catch (error) {
    console.error("Error in add tracks to playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Remove Tracks from Playlist
router.delete("/:playlistId/tracks", reqAuth, async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    const { tracks } = req.body;

    if (!tracks) {
      return res.status(400).json({ message: "Tracks are required" });
    }

    const headers = {
      Authorization: `Bearer ${req.session.access_token}`,
      "Content-Type": "application/json",
    };

    const playlistResponse = await axios.delete(
      `${API_BASE_URL}/playlists/${playlistId}/tracks`,
      { headers, data: { tracks } }
    );

    return res.json({
      message: "Tracks removed successfully",
      playlist: playlistResponse.data,
    });
  } catch (error) {
    console.error("Error in remove tracks from playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
