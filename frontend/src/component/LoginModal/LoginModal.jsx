import React, { useState } from "react";
// import { loginDemo } from "../../redux/authSlice";
import SpotifyLogo from "../../assets/Primary_Logo_White_CMYK.svg";
import "./LoginModal.css";

function LoginModal() {
  const [loading, setLoading] = useState(false);

  // Regular Spotify login
  const handleSpotifyLogin = () => {
    setLoading(true);
    window.location.href = "/api/auth/login";
  };

  // Demo user login
  const handleDemoLogin = () => {
    setLoading(true);
    window.location.href = "/api/auth/demo";
  };

  return (
    <div className="login-modal">
      <div className="login-modal-header">
        <h2>Welcome to BeatMatch AI</h2>
        <p>
          Generate personalized Spotify playlists based on your mood, activity,
          or preferences
        </p>
      </div>

      <div className="login-modal-options py-5">
        <button
          onClick={handleSpotifyLogin}
          className="spotify-login-btn flex gap-2 items-center justify-center"
          disabled={loading}
        >
          <img src={SpotifyLogo} alt="Spotify" className="w-8 h-8 " />
          <span>Login with Spotify</span>
        </button>

        <div className="login-divider">
          <span>or</span>
        </div>

        <button
          onClick={handleDemoLogin}
          className="demo-login-btn"
          disabled={loading}
        >
          {loading ? "Loading..." : "Try Demo Version"}
        </button>
      </div>

      <div className="login-modal-footer">
        <p>
          Demo users can browse and generate playlists, but cannot save to
          Spotify
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
