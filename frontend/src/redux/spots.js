import { csrfFetch } from "./csrf";

  const SET_ALLSPOT = "spots/setAllSpot";
  const SET_SINGLESPOT = "spots/setSingleSpot";
  const CREATE_SINGLESPOT = "spots/createSingleSpot";
  const ADD_IMAGES = "spots/setImages";
  const REMOVE_IMAGES = "spots/removeImages";
  const LOAD_USERSPOTS = "spots/loadUserSpots";
  const REMOVE_USERSPOT = "spots/removeUserSpot";
  const RESET_USERSPOTS = "spots/resetUserSpots";
  const UPDATE_SPOT = "spots/updateSpot";

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

const addImages = (images, sessionUser) => {
  const { previewResponse, slicedImages } = images;
  const payload = [previewResponse, ...(slicedImages || [])];
  return {
    type: ADD_IMAGES,
    payload: { images: payload, sessionUser },
  };
};

const removeImages = spotId => {
  return {
    type: REMOVE_IMAGES,
    payload: spotId,
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

export const updateSpot = spot => ({
  type: UPDATE_SPOT,
  payload: spot
});

export const loadSpots = () => async dispatch => {
  let page = 1;
  let allSpots = {};

  while (true) {
    const payload = await csrfFetch(`/api/spots?page=${page}`);
    const response = await payload.json();
    const spots = response.spots;

    spots && spots.forEach(spot => {
      allSpots[spot.id] = spot;
    });

    if (spots && spots.length !== 20) {
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
  const { Spots } = response;

  dispatch(setSingleSpot({ spot: Spots }));

  return response;
}

export const updateSpotImages = detailsPayload => async dispatch => {
  const { spotId, images } = detailsPayload;

  const imagesToUpdate = images.filter(img => img && !img.url && img.id);
  const formData = new FormData();

  for (const image of imagesToUpdate) {
      if (image && image.file) {
          formData.append('image', image.file);
      }

      await csrfFetch(`/api/spot-images/${image.id}`, {
          method: "PUT",
          body: formData,
      });
  }

  const newImages = images.filter(img => img && img.file && !img.id);
  if (newImages.length) {
      const formData = new FormData();
      for (const img of newImages) {
          formData.append('image', img.file);
      }

      const response = await csrfFetch(`/api/spots/${spotId}/images`, {
          method: "POST",
          body: formData,
      });

      const data = await response.json();
      const { previewResponse, slicedImages } = data;
      dispatch(addImages({ previewResponse, slicedImages }));
  }

  return true;
};

export const addImagesToSpot = ({ spotId, imageFiles }) => async dispatch => {
  const newImages = imageFiles.filter(img => img);
  const formData = new FormData();

  for (const img of newImages) {
      formData.append('image', img.file);
  }

  try {
      const response = await csrfFetch(`/api/spots/${spotId}/images`, {
          method: 'POST',
          body: formData,
      });

      if (response.ok) {
          const images = await response.json();
          dispatch(addImages(images));
          return true;
      } else {
          const errorData = await response.json();
          throw new Error(errorData.error);
      }
  } catch (error) {
      console.error('Error uploading images:', error.message);
      return false;
  }
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

  console.log(response)
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

export const fetchUpdateSpot = spot => async dispatch => {
  const { spotId } = spot;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(spot)
  };

  const res = await csrfFetch(`/api/spots/${spotId}`, options);
  const payload = await res.json();

  if (res.ok) {
    dispatch(updateSpot(payload));

    return { ...payload, ok: true};
  } else {

    return payload;
  };
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
    case UPDATE_SPOT:
      return {
        ...state,
        userSpots: {
          ...state.userSpots,
          [action.payload.id]: action.payload
        },
      };
    case REMOVE_IMAGES:
      return {
        ...state,
        userSpots: {
          ...state.userSpots,
          [action.payload]: {
            ...state.userSpots[action.payload],
            SpotImages: []
          },
        },
        singleSpot: { ...state.singleSpot, SpotImages: []}
      };
    case ADD_IMAGES:
      return {
        ...state,
        singleSpot: {
          ...state.singleSpot,
          SpotImages: action.payload.images,
          Owner: action.payload.sessionUser,
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
      return { ...state, userSpots: {} };
    default:
      return state;
  }
};


export default spotsReducer;
