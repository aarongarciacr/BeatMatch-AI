// Action Types
const SET_USER = "auth/SET_USER";
const REMOVE_USER = "auth/REMOVE_USER";
const SET_ERROR = "auth/SET_ERROR";
export const RESET_STATE = "auth/RESET_STATE";

// Action Creators
const setUserAction = (user) => ({
  type: SET_USER,
  user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setError = (error) => ({
  type: SET_ERROR,
  error,
});

export const resetState = () => ({
  type: RESET_STATE,
});

// Thunks

export const loginDemo = () => async (dispatch) => {
  const response = await fetch("/api/auth/demo", {
    credentials: "include",
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(setUserAction(user));
    return user;
  }
};

export const fetchUserProfile = () => async (dispatch) => {
  try {
    const response = await fetch("/api/auth/user", {
      credentials: "include",
    });

    if (response.ok) {
      const user = await response.json();
      dispatch(setUserAction(user));
      return user;
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    credentials: "include",
  });

  if (response.ok) {
    dispatch(removeUser());
    dispatch(resetState());
  }
};

// Initial State
const initialStateReducer = {
  user: null,
  isAuthenticated: false,
  isDemo: false,
  error: null,
};

// Reducer
const authReducer = (state = initialStateReducer, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        isDemo: action.user?.isDemo || false,
        error: null,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isDemo: false,
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default authReducer;
