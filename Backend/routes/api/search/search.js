const express = require("express");
const router = express.Router();
const axios = require("axios");
const { reqAuth } = require("../../../utils/reqAuth");

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const AUTH_URL = "https://accounts.spotify.com/authorize";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE_URL = "https://api.spotify.com/v1";

//search for artists
router.get("/artists", reqAuth, async (req, res) => {
  try {
    const { q, type } = req.query;

    const response = await axios.get(
      `${API_BASE_URL}/search?q=${q}&type=${type}&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${req.user.accessToken}`,
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error("Failed to fetch data from Spotify API", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch data from Spotify API" });
  }
});

module.exports = router;
