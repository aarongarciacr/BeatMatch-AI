const { reqAuth } = require("../../../utils/reqAuth");
const express = require("express");
const axios = require("axios");
const User = require("../../../models/User");
const { generatePlaylist } = require("../OpenAI/openai.js");

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
      plalist: playlistResponse.data,
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

//Generate Playlist
router.post("/generate", reqAuth, async (req, res) => {
  try {
    const { mood, activity, favoriteGenresAndArtists, length } = req.body;

    if (!mood || !activity || !favoriteGenresAndArtists) {
      return res.status(400).json({
        message: "Mood, activity, genres and/or artists are required",
      });
    }

    // Step 1: Generate initial playlist using OpenAI
    let playlist = await generatePlaylist(
      mood,
      activity,
      favoriteGenresAndArtists,
      length
    );
    if (!playlist || !playlist.songs || playlist.songs.length === 0) {
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

    // Step 2: Create a new Spotify playlist
    const playlistResponse = await axios.post(
      `${API_BASE_URL}/users/${user.spotifyId}/playlists`,
      {
        name: playlist.playlist_name,
        description: playlist.description,
        public: true,
      },
      { headers }
    );

    const newPlaylistId = playlistResponse.data.id;

    // Step 3: Search for tracks on Spotify & collect URIs
    let trackUris = [];
    let missingSongs = []; // Tracks that weren't found

    for (const song of playlist.songs) {
      const query = encodeURIComponent(
        `track:${song.title} artist:${song.artist}`
      );
      const url = `${API_BASE_URL}/search?q=${query}&type=track&limit=1`;

      try {
        const response = await axios.get(url, { headers });
        if (response.data.tracks.items.length > 0) {
          const track = response.data.tracks.items[0];
          trackUris.push(track.uri);
        } else {
          missingSongs.push(song); // Keep track of unfound songs
        }
      } catch (error) {
        console.error(
          `Error fetching track: ${song.title}`,
          error.response?.data || error.message
        );
      }
    }

    // Step 4: If there are missing songs, request replacements from OpenAI
    if (missingSongs.length > 0) {
      console.log(`Requesting ${missingSongs.length} replacement songs...`);

      const replacementPlaylist = await generatePlaylist(
        mood,
        activity,
        favoriteGenresAndArtists,
        missingSongs.length // Only fetch replacements for the missing tracks
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
            trackUris.push(track.uri); // Add found replacements to the list
          } else {
            console.log(
              `Replacement track not found: ${song.title} - ${song.artist}`
            );
          }
        } catch (error) {
          console.error(
            `Error fetching replacement track: ${song.title}`,
            error.response?.data || error.message
          );
        }
      }
    }

    // Step 5: Make sure we have at least some tracks
    if (trackUris.length === 0) {
      return res.status(500).json({
        message: "No tracks found on Spotify. Playlist cannot be created.",
      });
    }

    // Step 6: Add tracks to Spotify playlist
    await axios.post(
      `${API_BASE_URL}/playlists/${newPlaylistId}/tracks`,
      { uris: trackUris },
      { headers }
    );

    return res.json({
      message: "AI-generated playlist saved to Spotify",
      playlistUrl: playlistResponse.data.external_urls.spotify,
      playlistId: newPlaylistId,
      addedTracks: trackUris.length,
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
