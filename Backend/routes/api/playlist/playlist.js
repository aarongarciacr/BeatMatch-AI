const { reqAuth } = require("../../../utils/reqAuth");
const express = require("express");
const axios = require("axios");

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

module.exports = router;
