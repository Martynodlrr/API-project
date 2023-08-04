import { csrfFetch } from "./csrf";

  const SET_ALLSPOT = "spots/setAllSpot";
  const SET_SINGLESPOT = "spots/setSingleSpot";
  const CREATE_SINGLESPOT = "spots/createSingleSpot";
  const SET_IMAGES = "spots/setImages";
  const LOAD_USERSPOTS = "spots/loadUserSpots";
  const REMOVE_USERSPOT = "spots/removeUserSpot";
  const RESET_USERSPOTS = "spots/resetUserSpotS";

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

const setImages = (images, sessionUser) => {
  const { previewResponse, imagesResponses } = images;
  const payload = [previewResponse, ...imagesResponses];
  return {
    type: SET_IMAGES,
    payload: { images: payload, sessionUser },
  };
};

const loadUserSpots = spots => {
  return {
    type: LOAD_USERSPOTS,
    payload: spots,
  };
};

export const removeUserSpot = spotId => ({
  type: REMOVE_USERSPOT,
  payload: spotId
});

export const resetUserSpots = () => ({
  type: RESET_USERSPOTS
});

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

export const createImages = imagesData => async dispatch => {
  const { spotId, previewImg, images, sessionUser } = imagesData;

  const previewOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: previewImg, preview: true })
  };
  const previewPayload = await csrfFetch(`/api/spots/${spotId}/images`, previewOptions);
  const previewResponse = await previewPayload.json();
  const imagesResponses = [previewResponse];

  if (images && images.length > 0) {
    for (let imageUrl of images) {
        const imageOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: imageUrl, preview: false })
        };

        const imagePayload = await csrfFetch(`/api/spots/${spotId}/images`, imageOptions);
        const imageResponse = await imagePayload.json();

        imagesResponses.push(imageResponse);
      }
    };

    dispatch(setImages({ previewResponse, imagesResponses }, sessionUser));
  return true;
};

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

  if (payload.ok) {
    dispatch(createSingleSpot(response));
    return { ...response, ok: true };
  };

  return response;
};

export const fetchUserSpots = () => async dispatch => {
  const payload = await csrfFetch('/api/spots/current');
  const response = await payload.json();

  if (!response.message) {
    const { Spots } = response;
    const userSpots = {};

    Spots.forEach(spot => {
      userSpots[spot.id] = spot;
    });

    dispatch(loadUserSpots(userSpots));

    return response;
  };

  return response;
};

export const fetchRemoveOwnSpot = spotId => async dispatch => {
  const options = { method: 'DELETE' };
  const res = await csrfFetch(`/api/spots/${spotId}`, options);
  const payload = await res.json();

  if (res.ok) {
    dispatch(removeUserSpot(spotId));
    dispatch(fetchUserSpots());

    return { ...payload, ok: true};
  } else {
    const { message } = await res.json();

    return message;
  };
};

export const thunkResetUserSpots = () => async dispatch => {
  dispatch(resetUserSpots());
  return true;
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
  userSpots: {},
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
    case SET_IMAGES:
      return {
        ...state,
        singleSpot: {
          ...state.singleSpot,
          SpotImages: action.payload.images,
          Owner: action.payload.sessionUser
        },
      };
    case LOAD_USERSPOTS:
      return {
        ...state,
        userSpots: action.payload,
      };
      case REMOVE_USERSPOT:
        const newState = { ...state };
        delete newState.userSpots[action.payload];
        return newState;
      case RESET_USERSPOTS:
        return { ...state, userSpots: {}};
    default:
      return state;
  }
};

export default spotsReducer;
