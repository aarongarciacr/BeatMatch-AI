// Action Types
const GET_PLAYLISTS = "playlists/GET_PLAYLISTS";
const GET_PLAYLIST_DETAILS = "playlists/GET_PLAYLIST_DETAILS";
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST";
const UPDATE_PLAYLIST = "playlists/UPDATE_PLAYLIST";
const DELETE_PLAYLIST = "playlists/DELETE_PLAYLIST";

// Action Creators
const getPlaylists = (playlists) => ({
  type: GET_PLAYLISTS,
  playlists,
});

const getPlaylistDetails = (playlist) => ({
  type: GET_PLAYLIST_DETAILS,
  playlist,
});

const createPlaylist = (playlist) => ({
  type: CREATE_PLAYLIST,
  playlist,
});

const updatePlaylist = (playlist) => ({
  type: UPDATE_PLAYLIST,
  playlist,
});

const deletePlaylist = (playlistId) => ({
  type: DELETE_PLAYLIST,
  playlistId,
});

// Thunks
export const fetchUserPlaylists = () => async (dispatch) => {
  const response = await fetch("/api/playlists", {
    credentials: "include",
  });

  if (response.ok) {
    const playlists = await response.json();
    dispatch(getPlaylists(playlists));
    return playlists;
  }
};

export const fetchPlaylistDetails = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`, {
    credentials: "include",
  });

  if (response.ok) {
    const playlist = await response.json();
    dispatch(getPlaylistDetails(playlist));
    return playlist;
  }
};

export const fetchCreatePlaylist = (playlistData) => async (dispatch) => {
  const response = await fetch("/api/playlists", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playlistData),
  });

  if (response.ok) {
    const playlist = await response.json();
    dispatch(createPlaylist(playlist));
    return playlist;
  }
};

// Initial State
const initialState = {
  items: [],
  status: "idle",
  error: null,
};

// Reducer
const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYLISTS:
      return {
        ...state,
        items: action.playlists,
        status: "succeeded",
      };
    case GET_PLAYLIST_DETAILS:
      return {
        ...state,
        singlePlaylist: action.playlist,
        status: "succeeded",
      };
    case CREATE_PLAYLIST:
      return {
        ...state,
        items: [...state.items, action.playlist],
      };
    case UPDATE_PLAYLIST:
      return {
        ...state,
        items: state.items.map((playlist) =>
          playlist.id === action.playlist.id ? action.playlist : playlist
        ),
      };
    case DELETE_PLAYLIST:
      return {
        ...state,
        items: state.items.filter(
          (playlist) => playlist.id !== action.playlistId
        ),
      };
    default:
      return state;
  }
};

export default playlistReducer;
