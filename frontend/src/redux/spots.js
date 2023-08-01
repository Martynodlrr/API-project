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

  console.log('what is response yo: ', response);
  dispatch(setSingleSpot(response));

  return response;
}

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
