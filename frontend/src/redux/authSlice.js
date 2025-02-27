import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error in fetch user:", error);
    return {};
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
