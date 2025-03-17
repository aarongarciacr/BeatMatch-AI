const { reqAuth } = require("../../../utils/reqAuth");
const express = require("express");
const axios = require("axios");
const User = require("../../../models/User");
const { generatePlaylist } = require("../OpenAI/openai.js");
const Playlist = require("../../../models/Playlist");

const router = express.Router();

const API_BASE_URL = "https://api.spotify.com/v1";

// GET users playlists
router.get("/", reqAuth, async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  let headers = {
    Authorization: `Bearer ${req.session.access_token}`,
  };

  let response = await axios.get(
    `${API_BASE_URL}/me/playlists?limit=${limit}&offset=${offset}`,
    {
      headers: headers,
    }
  );

  let playlists = response.data;
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
      playlist: playlistResponse.data,
    });
  } catch (error) {
    console.error("Error in create playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Get Playlist Details
router.get("/:playlistId", reqAuth, async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    const headers = {
      Authorization: `Bearer ${req.session.access_token}`,
    };

    const playlistResponse = await axios.get(
      `${API_BASE_URL}/playlists/${playlistId}`,
      { headers }
    );

    return res.json(playlistResponse.data);
  } catch (error) {
    console.error("Error in get playlist details:", error);
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

//Get Playlist to display on "Discover" page
router.get("/discover", reqAuth, async (req, res) => {
  try {
    const user = "BeatMatch-AI";
    const playlists = await Playlist.find({ userId: user });
    return res.json(playlists);
  } catch (error) {
    console.error("Error in get all playlists from database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Get all playlist generated by AI from database
router.get("/db", reqAuth, async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user.spotifyId });
    return res.json(playlists);
  } catch (error) {
    console.error("Error in get all playlists from database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Get playlist from database
router.get("/db/:playlistId", reqAuth, async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    return res.json(playlist);
  } catch (error) {
    console.error("Error in get playlist from database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Get playlists' tracks on Spotify
router.get("/db/:playlistId/tracks", reqAuth, async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    const user = await User.findOne({ spotifyId: playlist.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const headers = {
      Authorization: `Bearer ${user.accessToken}`,
    };

    let tracks = [];
    for (const track of playlist.tracks) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/tracks/${track.spotifyId}`,
          { headers }
        );
        tracks.push(response.data);
      } catch (error) {
        console.error(
          `Error fetching track: ${track.title}`,
          error.response?.data || error.message
        );
      }
    }

    return res.json(tracks);
  } catch (error) {
    console.error("Error in get playlist tracks from database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Generate Playlist
router.post("/generate", reqAuth, async (req, res) => {
  try {
    const { mood, activity, favoriteGenresAndArtists, length } = req.body;

    if (!mood || !activity || !favoriteGenresAndArtists) {
      return res.status(400).json({
        message: "Mood, activity, genres and/or artists are required",
      });
    }

    // Generate playlist using OpenAI
    let playlistData = await generatePlaylist(
      mood,
      activity,
      favoriteGenresAndArtists,
      length
    );
    if (
      !playlistData ||
      !playlistData.songs ||
      playlistData.songs.length === 0
    ) {
      return res.status(500).json({ message: "Failed to generate playlist" });
    }

    const user = await User.findOne({ spotifyId: req.user.spotifyId });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, please log in again." });
    }

    const headers = {
      Authorization: `Bearer ${user.accessToken}`,
      "Content-Type": "application/json",
    };

    // Search for tracks on Spotify & collect track info
    let tracks = [];
    let missingSongs = [];

    for (const song of playlistData.songs) {
      const query = encodeURIComponent(
        `track:${song.title} artist:${song.artist}`
      );
      const url = `${API_BASE_URL}/search?q=${query}&type=track&limit=1`;

      try {
        const response = await axios.get(url, { headers });
        if (response.data.tracks.items.length > 0) {
          const track = response.data.tracks.items[0];
          tracks.push({
            uri: track.uri,
            title: song.title,
            artist: song.artist,
            spotifyId: track.id,
          });
        } else {
          missingSongs.push(song);
        }
      } catch (error) {
        console.error(
          `Error fetching track: ${song.title}`,
          error.response?.data || error.message
        );
      }
    }

    // Handle missing tracks with replacements
    if (missingSongs.length > 0) {
      const replacementPlaylist = await generatePlaylist(
        mood,
        activity,
        favoriteGenresAndArtists,
        missingSongs.length
      );

      for (const song of replacementPlaylist.songs) {
        const query = encodeURIComponent(
          `track:${song.title} artist:${song.artist}`
        );
        const url = `${API_BASE_URL}/search?q=${query}&type=track&limit=1`;

        try {
          const response = await axios.get(url, { headers });
          if (response.data.tracks.items.length > 0) {
            const track = response.data.tracks.items[0];
            tracks.push({
              uri: track.uri,
              title: song.title,
              artist: song.artist,
              spotifyId: track.id,
            });
          }
        } catch (error) {
          console.error(
            `Error fetching replacement track: ${song.title}`,
            error.response?.data || error.message
          );
        }
      }
    }

    if (tracks.length === 0) {
      return res.status(500).json({
        message: "No tracks found on Spotify. Playlist cannot be created.",
      });
    }

    // Create new playlist in database
    const playlist = new Playlist({
      name: playlistData.playlist_name,
      description: playlistData.description,
      userId: user.spotifyId,
      tracks: tracks,
    });

    await playlist.save();

    return res.json({
      message: "AI-generated playlist saved to database",
      playlist: {
        id: playlist._id,
        name: playlist.name,
        description: playlist.description,
        trackCount: tracks.length,
      },
    });
  } catch (error) {
    console.error("Error in generating and saving playlist:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.response?.data,
    });
  }
});

module.exports = router;
