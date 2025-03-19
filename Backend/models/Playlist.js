const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  userId: {
    type: String,
    required: true,
  },
  mood: String,
  activity: String,
  length: Number,
  tracks: [
    {
      uri: String,
      title: String,
      artist: String,
      spotifyId: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;
