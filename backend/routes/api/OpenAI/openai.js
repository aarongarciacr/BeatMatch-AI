const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generatePlaylist = async (
  mood,
  activity,
  favoriteGenresAndArtists,
  length
) => {
  try {
    if (!length || isNaN(length) || length <= 0) {
      length = 10; // Default to 10 songs if input is missing or invalid
    }

    const prompt = `You are a playlist generator AI. Create a playlist with exactly ${length} songs based on :
    - Mood: "${mood}"
    - Activity: "${activity}"
    - Favorite Genres And Artist: ${favoriteGenresAndArtists.join(", ")}

    ### Instructions:
    1 **Generate a creative funny playlist name** that reflects the user's mood and activity.
    2 **Write a sarcastic, sassy, and funny engaging description** (1 sentence max) about the playlist.
    3 **Generate exactly ${length} songs** that match the user's preferences.
    4 **Look for recent songs** that are popular and trending.
    5 **Verify the song exists and it's a real song** don't make up any song.
    6 If you cannot find enough songs, **repeat similar tracks until the list is exactly ${length} long**.
    7 **Return the result as a JSON object** in the following format:

    {
      "playlist_name": "Generated Playlist Name",
      "description": "Short description about the playlist",
      "songs": [
        {"title": "Song Name", "artist": "Artist Name", "genre": "Genre"},
        ...
      ]
    `;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
    });

    const result = response.choices[0].message.content;

    try {
      const parsedResult = JSON.parse(result);

      // Ensure we always return exactly the requested number of songs
      return parsedResult;
    } catch (jsonError) {
      console.error(
        "JSON Parsing Error:",
        jsonError,
        "Raw OpenAI Response:",
        result
      );
      return [];
    }
  } catch (error) {
    console.error("Error in generate playlist:", error);
    return [];
  }
};

module.exports = { generatePlaylist };
