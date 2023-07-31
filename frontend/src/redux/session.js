import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = user => async dispatch => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    })
  });
  const data = await response.json();

  if (data.ok) dispatch(setUser(data.user));
  return data;
};

export const signup = user => async dispatch => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });

  if (response.ok) {
    const payload = await response.json();
    dispatch(setUser(payload.user));
    return payload;
  } else {
    const data = await response.json();
    return data;
  }
};

export const restoreUser = () => async dispatch => {
  const payload = await csrfFetch("/api/session");
  const data = await payload.json();
  dispatch(setUser(data.user));
  return payload;
};

export const resetUser = () => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default sessionReducer;
