const express = require("express");
const router = express.Router();
const { reqAuth } = require("../../../utils/reqAuth");
const axios = require("axios");
const User = require("../../../models/User");

// Move these to use const for better practice
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const FRONTEND_URI =
  process.env.NODE_ENV === "production"
    ? "https://beatmatch-ai.onrender.com/discover"
    : "http://localhost:5173/discover";

const AUTH_URL = "https://accounts.spotify.com/authorize";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE_URL = "https://api.spotify.com/v1";

router.get("/", (req, res) => {
  // Update the login link to use the full path
  res.send("Hello World! <a href='/api/auth/login'>Login with Spotify</a>");
});

// Add this to your backend auth routes file
router.get("/demo", async (req, res) => {
  try {
    const refresh_token = process.env.DEMO_REFRESH_TOKEN;

    if (!refresh_token) {
      return res.status(500).send("Demo user not configured");
    }

    const tokenResponse = await axios.post(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = tokenResponse.data;
    const expiresAt = Date.now() + expires_in * 1000;

    req.session.access_token = access_token;
    req.session.refresh_token = refresh_token;
    req.session.expires_at = expiresAt;
    req.session.is_demo = true;

    const userProfile = await axios.get(`${API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Update or create demo user
    const demoUser = await User.updateOne(
      { spotifyId: userProfile.data.id },
      {
        spotifyId: userProfile.data.id,
        email: userProfile.data.email,
        display_name: userProfile.data.display_name,
        country: userProfile.data.country,
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expiresAt,
        lastLogin: new Date(),
      },
      { upsert: true }
    );
    // Redirect with success parameter
    return res.redirect(FRONTEND_URI);
  } catch (error) {
    console.error("Demo login error:", error);
    return res.status(500).send("Demo login failed");
  }
});

router.get("/login", (req, res) => {
  const scope =
    "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read user-follow-read user-follow-modify";

  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    scope: scope,
    // show_dialog: true, // Forces login every time
  });

  let auth_url = `${AUTH_URL}?${new URLSearchParams(params).toString()}`;

  return res.redirect(auth_url);
});

router.get("/callback", async (req, res) => {
  try {
    if ("error" in req.query) {
      return res.status(400).send("Error: " + req.query.error);
    }

    let code = req.query.code;

    let params = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    };

    let token = await axios.post(TOKEN_URL, new URLSearchParams(params), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    let access_token = token.data.access_token;
    let refresh_token = token.data.refresh_token;
    let expires_at = Date.now() + token.data.expires_in * 1000;

    req.session.access_token = access_token;
    req.session.refresh_token = refresh_token;
    req.session.expires_at = expires_at;
    req.session.access_token = token.data.access_token;
    req.session.refresh_token = token.data.refresh_token;

    let userProfile = await axios.get(`${API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Update or create user
    await User.updateOne(
      { spotifyId: userProfile.data.id },
      {
        spotifyId: userProfile.data.id,
        email: userProfile.data.email,
        display_name: userProfile.data.display_name,
        country: userProfile.data.country,
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expires_at,
        lastLogin: new Date(),
      },
      { upsert: true }
    );
    // Redirect with success parameter
    return res.redirect(FRONTEND_URI);
    // return res.status(200);
  } catch (error) {
    console.error("Auth callback error:", error);
    return res.redirect("http://localhost:5173/?loginSuccess=false");
  }
});

router.get("/refresh", reqAuth, async (req, res) => {
  try {
    let params = {
      grant_type: "refresh_token",
      refresh_token: req.session.refresh_token,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    };

    let token = await axios.post(TOKEN_URL, new URLSearchParams(params), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    let access_token = token.data.access_token;
    let expires_at = Date.now() + token.data.expires_in * 1000;

    await User.updateOne(
      { refreshToken: req.session.refresh_token },
      {
        accessToken: access_token,
        expiresAt: expires_at,
        lastLogin: new Date(),
      }
    );

    req.session.access_token = access_token;
    req.session.expires_at = expires_at;

    return res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    console.error("Token refresh error:", error);
    return res.status(500).send("Token refresh failed");
  }
});

//get user info
router.get("/user", reqAuth, async (req, res) => {
  try {
    const result = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${req.session.access_token}` },
    });

    return res.json(result.data);
  } catch (error) {
    console.error("Error in fetch user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect(FRONTEND_URI);
});

module.exports = router;
