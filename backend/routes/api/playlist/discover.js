const express = require("express");
const axios = require("axios");
const router = express.Router();
const { reqAuth } = require("../auth/authRoutes");
const Playlist = require("../../../models/Playlist");
const User = require("../../../models/User");

const moods = [
  "Happy",
  "Sad",
  "Chill",
  "Excited",
  "Romantic",
  "Energetic",
  "Motivated",
  "Calm",
];

const activities = ["Workout", "Study", "Party", "Focus", "Sleep", "Drive"];

const BEATMATCH_SPOTIFY_ID = process.env.BEATMATCH_SPOTIFY_ID;

// Get playlists to display on "Discover" page
router.get("/", async (req, res) => {
  try {
    const playlists = await Playlist.find({
      userId: { $eq: BEATMATCH_SPOTIFY_ID },
    });
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching discover playlists:", error);
    res.status(500).send("Error fetching discover playlists");
  }
});

//Get Playlist by Mood
router.get("/mood/:mood", async (req, res) => {
  try {
    const moodParam = req.params.mood;
    const mood = moodParam.split("-").find((mood) => moods.includes(mood));
    const playlists = await Playlist.find({
      $and: [
        { userId: { $eq: BEATMATCH_SPOTIFY_ID } },
        { mood: { $eq: mood } },
      ],
    });
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching discover playlists:", error);
    res.status(500).send("Error fetching discover playlists");
  }
});

//Get Playlist by Activity
router.get("/activity/:activity", async (req, res) => {
  try {
    const activityParam = req.params.activity;
    const activity = activityParam
      .split("-")
      .find((activity) => activities.includes(activity));
    const playlists = await Playlist.find({
      $and: [
        { userId: { $eq: BEATMATCH_SPOTIFY_ID } },
        { activity: { $eq: activity } },
      ],
    });
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching discover playlists:", error);
    res.status(500).send("Error fetching discover playlists");
  }
});

module.exports = router;
