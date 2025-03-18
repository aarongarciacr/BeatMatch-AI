const express = require("express");
const axios = require("axios");
const router = express.Router();
const { reqAuth } = require("../auth/authRoutes");

const API_BASE_URL = "https://api.spotify.com/v1";
const BEATMATCH_SPOTIFY_ID = process.env.BEATMATCH_SPOTIFY_ID;

// Get playlists to display on "Discover" page
router.get("/", async (req, res) => {
  const headers = {
    Authorization: `Bearer ${req.session.access_token}`,
  };
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${BEATMATCH_SPOTIFY_ID}/playlists`,
      { headers }
    );
    const playlists = response.data.items;
    res.json(playlists);
  } catch (error) {
    res.status(400).json({ message: error.response?.data || error.message });
  }
});

module.exports = router;
