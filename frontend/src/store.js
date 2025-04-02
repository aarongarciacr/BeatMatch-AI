import { configureStore } from "@reduxjs/toolkit";
import authReducer, { RESET_STATE } from "./redux/authSlice";
import playlistReducer from "./redux/playlistSlice";

const appReducer = {
  auth: authReducer,
  playlists: playlistReducer,
};

const store = configureStore({
  reducer: (state, action) => {
    if (action.type === RESET_STATE) {
      state = undefined; // Reset the state
    }

    return Object.keys(appReducer).reduce((acc, key) => {
      acc[key] = appReducer[key](state ? state[key] : undefined, action);
      return acc;
    }, {});
  },
});

export default store;
