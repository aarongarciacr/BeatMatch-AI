import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserPlaylists, generatePlaylist } from "../api/spotifyApi";

export const loadUserPlaylists = createAsyncThunk(
  "playlists/fetch",
  async () => {
    return await fetchUserPlaylists();
  }
);

export const createPlaylist = createAsyncThunk(
  "playlists/generate",
  async (params) => {
    return await generatePlaylist(params);
  }
);

const playlistSlice = createSlice({
  name: "playlists",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserPlaylists.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserPlaylists.fulfilled, (state, action) => {
        state.playlists = action.payload;
        state.loading = false;
      })
      .addCase(loadUserPlaylists.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.playlists.push(action.payload.playlist);
        state.loading = false;
      })
      .addCase(createPlaylist.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default playlistSlice.reducer;
