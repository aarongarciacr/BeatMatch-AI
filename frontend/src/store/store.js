import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import playlistReducer from "../redux/playlistSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    playlists: playlistReducer,
  },
});

export default store;
