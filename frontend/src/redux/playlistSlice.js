// Action Types
const GET_PLAYLISTS = "playlists/GET_PLAYLISTS";
const GET_PLAYLIST_DETAILS = "playlists/GET_PLAYLIST_DETAILS";
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST";
const UPDATE_PLAYLIST = "playlists/UPDATE_PLAYLIST";
const DELETE_PLAYLIST_DB = "playlists/DELETE_PLAYLIST_DB";
const FOLLOW_PLAYLIST = "playlists/FOLLOW_PLAYLIST";
const DELETE_PLAYLIST_SPOTIFY = "playlists/DELETE_PLAYLIST_SPOTIFY";
const GENERATE_PLAYLIST = "playlists/GENERATE_PLAYLIST";
const SET_PAGINATION = "playlists/SET_PAGINATION";
const GET_GENERATED_PLAYLIST = "playlists/GET_GENERATED_PLAYLIST";
const GET_TRACKS = "playlists/GET_TRACKS";
const ADD_TRACKS = "playlists/ADD_TRACKS";
const GET_DISCOVER_PLAYLISTS = "playlists/GET_DISCOVER_PLAYLISTS";
const GET_PLAYLIST_BY_MOOD = "playlists/GET_PLAYLIST_BY_MOOD";
const GET_PLAYLIST_BY_ACTIVITY = "playlists/GET_PLAYLIST_BY_ACTIVITY";
const GET_AI_PLAYLISTS = "playlists/GET_AI_PLAYLISTS";

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

const followPlaylist = (playlistId) => ({
  type: FOLLOW_PLAYLIST,
  playlistId,
});

const deletePlaylistDB = (playlistId) => ({
  type: DELETE_PLAYLIST_DB,
  playlistId,
});

const deletePlaylistSpotify = (playlistId) => ({
  type: DELETE_PLAYLIST_SPOTIFY,
  playlistId,
});

const generatePlaylist = (playlist) => ({
  type: GENERATE_PLAYLIST,
  playlist,
});

const setPagination = (pagination) => ({
  type: SET_PAGINATION,
  pagination,
});

const getGeneratedPlaylist = (playlist) => ({
  type: GET_GENERATED_PLAYLIST,
  playlist,
});

const getTracks = (tracks) => ({
  type: GET_TRACKS,
  tracks,
});

const addTracks = (tracks) => ({
  type: ADD_TRACKS,
  tracks,
});

const getDiscoverPlaylists = (playlists) => ({
  type: GET_DISCOVER_PLAYLISTS,
  playlists,
});

const getAIPlaylists = (playlists) => ({
  type: GET_AI_PLAYLISTS,
  playlists,
});

const getPlaylistByMood = (playlists) => ({
  type: GET_PLAYLIST_BY_MOOD,
  playlists,
});

const getPlaylistByActivity = (playlists) => ({
  type: GET_PLAYLIST_BY_ACTIVITY,
  playlists,
});

// Thunks
export const fetchUserPlaylists =
  ({ limit = 10, offset = 0 }) =>
  async (dispatch) => {
    const response = await fetch(
      `/api/playlists?limit=${limit}&offset=${offset}`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(getPlaylists(data.items));
      dispatch(
        setPagination({
          next: data.next,
          previous: data.previous,
          total: data.total,
        })
      );
      return data;
    } else {
      console.error("Failed to fetch playlists");
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

export const fetchGeneratePlaylist = (playlistData) => async (dispatch) => {
  const response = await fetch("/api/playlists/generate", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playlistData),
  });

  if (response.ok) {
    const playlist = await response.json();
    dispatch(generatePlaylist(playlist));
    return playlist;
  }
};

export const fetchGetGeneratedPlaylist = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/db/${playlistId}`, {
    credentials: "include",
  });

  if (response.ok) {
    const playlist = await response.json();
    dispatch(getGeneratedPlaylist(playlist));
    return playlist;
  }
};

export const fetchGetTracks = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/db/${playlistId}/tracks`, {
    credentials: "include",
  });

  if (response.ok) {
    const tracks = await response.json();

    dispatch(getTracks(tracks));
    return tracks;
  }
};

export const fetchAddTracks = (playlistId, trackUris) => async (dispatch) => {
  try {
    const response = await fetch(`/api/playlists/${playlistId}/tracks`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uris: trackUris }),
    });

    if (response.ok) {
      const tracks = await response.json();
      dispatch(addTracks(tracks));
      return tracks;
    }
  } catch (error) {
    console.error("Error adding tracks:", error);
  }
};

export const fetchGetDiscoverPlaylists = () => async (dispatch) => {
  const response = await fetch("/api/discover", {
    credentials: "include",
  });

  if (response.ok) {
    const playlists = await response.json();
    dispatch(getDiscoverPlaylists(playlists));
    return playlists;
  }
};

export const fetchGetAIPlaylists =
  ({ page, limit }) =>
  async (dispatch) => {
    const response = await fetch(
      `/api/playlists/db?page=${page}&limit=${limit}`,
      {
        credentials: "include",
      }
    );

    if (response.ok) {
      const playlists = await response.json();
      dispatch(getAIPlaylists(playlists));
      return playlists;
    }
  };

export const fetchDeletePlaylistDB = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/db/${playlistId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.ok) {
    dispatch(deletePlaylistDB(playlistId));
  }
};

export const fetchFollowPlaylist = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}/follow`, {
    method: "PUT",
    credentials: "include",
  });

  if (response.ok) {
    dispatch(followPlaylist(playlistId));
  }
};

export const fetchDeletePlaylistSpotify = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.ok) {
    dispatch(deletePlaylistSpotify(playlistId));
  }
};

// Initial State
const initialState = {
  items: [],
  singlePlaylist: null,
  status: "idle",
  error: null,
  pagination: {
    next: null,
    previous: null,
    total: 0,
  },
};

export const fetchGetPlaylistByMood = (mood) => async (dispatch) => {
  const response = await fetch(`/api/discover/mood/${mood}`, {
    credentials: "include",
  });

  if (response.ok) {
    const playlists = await response.json();
    dispatch(getPlaylistByMood(playlists));
    return playlists;
  }
};

export const fetchGetPlaylistByActivity = (activity) => async (dispatch) => {
  const response = await fetch(`/api/discover/activity/${activity}`, {
    credentials: "include",
  });

  if (response.ok) {
    const playlists = await response.json();
    dispatch(getPlaylistByActivity(playlists));
    return playlists;
  }
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
    case GENERATE_PLAYLIST:
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
    case FOLLOW_PLAYLIST:
      return {
        ...state,
        singlePlaylist: {
          ...state.singlePlaylist,
          isFollowed: true,
        },
      };
    case DELETE_PLAYLIST_DB:
      return {
        ...state,
        items: state.items.filter(
          (playlist) => playlist.id !== action.playlistId
        ),
      };
    case DELETE_PLAYLIST_SPOTIFY:
      return {
        ...state,
        items: state.items.filter(
          (playlist) => playlist.id !== action.playlistId
        ),
      };
    case SET_PAGINATION:
      return {
        ...state,
        pagination: action.pagination,
      };
    case GET_GENERATED_PLAYLIST:
      return {
        ...state,
        singlePlaylist: action.playlist,
      };
    case GET_TRACKS:
      return {
        ...state,
        singlePlaylist: state.singlePlaylist
          ? {
              ...state.singlePlaylist,
              tracks: action.tracks,
            }
          : null,
      };
    case GET_DISCOVER_PLAYLISTS:
      return {
        ...state,
        discover: action.playlists,
        status: "succeeded",
      };
    case GET_AI_PLAYLISTS:
      return {
        ...state,
        aiPlaylists: action.playlists,
        status: "succeeded",
      };
    case GET_PLAYLIST_BY_MOOD:
      return {
        ...state,
        moodPlaylists: action.playlists,
        status: "succeeded",
      };
    case GET_PLAYLIST_BY_ACTIVITY:
      return {
        ...state,
        activityPlaylists: action.playlists,
        status: "succeeded",
      };
    default:
      return state;
  }
};

export default playlistReducer;
