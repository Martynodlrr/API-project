import { csrfFetch } from "./csrf";

const SET_ALLSPOT = "spots/setAllSpot";
const SET_SINGLESPOT = "spots/setSingleSpot";

const setAllSpot = spots => {
  return {
    type: SET_ALLSPOT,
    payload: spots,
  };
};

const setSingleSpot = spot => {
  return {
    type: SET_SINGLESPOT,
    payload: spot,
  };
};

export const loadSpots = () => async dispatch => {
  const payload = await csrfFetch("/api/spots");
  const response = await payload.json();

  const normalizedSpots = response.Spots.reduce((acc, spot) => {
    acc[spot.id] = spot;
    return acc;
  }, {});

  dispatch(setAllSpot(normalizedSpots));

  return normalizedSpots;
};

const initialState = {
  allSpots: {},
  singleSpot: {
    spotData: null,
    SpotImages: [],
    Owner: {
      ownerData: null,
    },
  },
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALLSPOT:
      return {
        ...state,
        allSpots: action.payload,
      };
    case SET_SINGLESPOT:
      return {
        ...state,
        singleSpot: action.payload,
      };
    default:
      return state;
  }
};

export default spotsReducer;
