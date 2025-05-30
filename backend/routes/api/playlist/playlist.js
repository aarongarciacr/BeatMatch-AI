const { reqAuth } = require("../../../utils/reqAuth");
const express = require("express");
const axios = require("axios");
const User = require("../../../models/User");
const { generatePlaylist } = require("../OpenAI/openai.js");
const Playlist = require("../../../models/Playlist");

const router = express.Router();

const API_BASE_URL = "https://api.spotify.com/v1";

// Static Routes
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

// Create Playlist on Spotify
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

    const playlistId = playlistResponse.data.id;

    const aiPlaylist = await Playlist.findOneAndUpdate(
      { name: name, description: description, userId: req.user.spotifyId },
      { spotifyId: playlistId, isFollowed: true },
      { new: true }
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

// Get all playlists generated by AI from database
router.get("/db", reqAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const playlists = await Playlist.find({ userId: req.user.spotifyId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Playlist.countDocuments({ userId: req.user.spotifyId });

    return res.json({
      playlists,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error in get all playlists from database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Generate Playlist
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
            image: track.album.images[0].url,
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
              image: track.album.images[0].url,
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
      spotifyId: null,
      name: playlistData.playlist_name,
      description: playlistData.description,
      userId: user.spotifyId,
      mood: mood,
      activity: activity,
      length: length,
      isFollowed: false,
      image: tracks[0].image,
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

// Dynamic Routes
// Get Playlist Details
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

// Change Playlist Details
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

//Delete Playlist from Database (AI Playlist)
router.delete("/db/:playlistId", reqAuth, async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findByIdAndDelete(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    return res.json({
      message: "Playlist deleted successfully",
      playlist: playlist,
    });
  } catch (error) {
    console.error("Error in delete playlist from database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Follow Playlist on Spotify
router.put("/:playlistId/follow", reqAuth, async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const headers = {
      Authorization: `Bearer ${req.session.access_token}`,
    };

    const playlistResponse = await axios.put(
      `${API_BASE_URL}/playlists/${playlistId}/followers`,
      {},
      { headers }
    );

    const playlistOnDB = await Playlist.updateOne(
      { spotifyId: playlistId },
      { isFollowed: true }
    );

    return res.json({
      message: "Playlist followed successfully",
      playlist: playlistResponse.data,
    });
  } catch (error) {
    console.error("Error in follow playlist on Spotify:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Delete Playlist from Spotify (Unfollow Playlist)
router.delete("/:playlistId", reqAuth, async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const headers = {
      Authorization: `Bearer ${req.session.access_token}`,
    };

    const playlistResponse = await axios.delete(
      `${API_BASE_URL}/playlists/${playlistId}/followers`,
      { headers }
    );

    const playlistOnDB = await Playlist.updateOne(
      { spotifyId: playlistId },
      { isFollowed: false }
    );

    return res.json({
      message: "Playlist deleted successfully",
      playlist: playlistResponse.data,
    });
  } catch (error) {
    console.error("Error in delete playlist from Spotify:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get playlist tracks
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

// Add Tracks to Playlist
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

// Remove Tracks from Playlist
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

// Get playlist from database
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

// Get playlists' tracks on Spotify using "Get Several Tracks"
router.get("/db/:playlistId/tracks", reqAuth, async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // If no tracks, return an empty array
    if (!playlist.tracks || playlist.tracks.length === 0) {
      return res.json([]);
    }

    // Collect all track IDs from the playlist
    const trackIds = playlist.tracks.map((track) => track.spotifyId);

    // NOTE: Spotify’s "Get Several Tracks" endpoint supports a maximum of 50 IDs per request.
    // If your playlist can have more than 50 tracks, you’ll need to split them into multiple requests.
    // Below is a helper function to chunk arrays into smaller pieces of size `chunkSize`.

    function chunkArray(array, chunkSize) {
      const chunks = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
      return chunks;
    }

    // Chunk track IDs if necessary
    const chunks = chunkArray(trackIds, 50);

    const headers = {
      Authorization: `Bearer ${req.session.access_token}`,
    };

    const allTracks = [];

    // For each chunk, call /v1/tracks with a comma-separated list of IDs
    for (const chunk of chunks) {
      const idsParam = chunk.join(",");
      // Optional: pass a `market` parameter if you want to filter availability, e.g. ?market=US
      // const market = req.query.market || 'US';

      const response = await axios.get(`${API_BASE_URL}/tracks`, {
        headers,
        params: { ids: idsParam },
      });

      // The response contains an array in response.data.tracks
      if (response.data && Array.isArray(response.data.tracks)) {
        allTracks.push(...response.data.tracks);
      }
    }

    return res.json(allTracks);
  } catch (error) {
    console.error("Error in get playlist tracks from database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
