import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const loginWithSpotify = () => {
  window.location.href = "http://localhost:5000/api/auth/login";
};

export const fetchUserPlaylists = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/playlists`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error in fetch user playlists:", error);
    return [];
  }
};

export const generatePlaylist = async (params) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/playlists/generate`,
      params,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error in generate playlist:", error);
    return [];
  }
};
