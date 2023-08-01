import { csrfFetch } from "./csrf";

const SET_ALLREVIEWS = "spots/setAllReviews";
const SET_OWNREVIEW = "spots/setSingleReview";

const setAllReviews = reviews => {
  return {
    type: SET_ALLREVIEWS,
    payload: reviews,
  };
};

const setOwnReview = review => {
  return {
    type: SET_OWNREVIEW,
    payload: review,
  };
};

export const loadReviews = spotId => async dispatch => {
    const payload = await csrfFetch(`/spots/${spotId}/reviews`);
    const response = await payload.json();
    console.log('what is response yo: ', response);

    // dispatch(setAllReviews(allSpots));

    return response;
};

export const fetchOwnReview = id => async dispatch => {
  const payload = await csrfFetch('/reviews/current');
  const response = await payload.json();

//   dispatch(setOwnReview(response));
    console.log('what si response yo: ', response);
  return response;
}

const initialState = {
    spot: {},
    user: {},
};


const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALLREVIEWS:
      return {
        ...state,
        spot: action.payload,
      };
    case SET_OWNREVIEW:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reviewsReducer;
