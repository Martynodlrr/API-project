import { csrfFetch } from "./csrf";

const SET_ALLSPOT = "spots/setAllSpot";
const SET_SINGLESPOT = "spots/setSingleSpot";
const CREATE_SINGLESPOT = "spots/createSingleSpot";

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

const createSingleSpot = spot => {
  return {
    type: CREATE_SINGLESPOT,
    payload: spot,
  };
};

export const loadSpots = () => async dispatch => {
  let page = 1;
  let allSpots = {};

  while (true) {
    const payload = await csrfFetch(`/api/spots?page=${page}`);
    const response = await payload.json();
    const spots = response.Spots;

    spots.forEach(spot => {
      allSpots[spot.id] = spot;
    });

    if (spots.length !== 20) {
      break;
    }

    page++;
  }

  dispatch(setAllSpot(allSpots));

  return allSpots;
};

export const fetchSingleSpot = id => async dispatch => {
  const payload = await csrfFetch(`/api/spots/${id}`);
  const response = await payload.json();

  dispatch(setSingleSpot(response));

  return response;
}

export const createSpot = spot => async dispatch => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(spot)
  };

  const payload = await csrfFetch('/api/spots', options);
  const response = await payload.json();
  // if (payload.ok) {
  //   dispatch(createSingleSpot(response));
  // };
  return response;
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
    case CREATE_SINGLESPOT:
      return {
        ...state,
        singleSpot: action.payload,
      };
    default:
      return state;
  }
};

export default spotsReducer;
