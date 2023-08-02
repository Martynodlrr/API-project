import { csrfFetch } from "./csrf";

const SET_ALLREVIEWS = "reviews/setAllReviews";
const RESET_ALLREVIEW = "reviews/resetAllReview";
const SET_OWNREVIEW = "review/setSingleReview";

const setAllReviews = reviews => {
  return {
    type: SET_ALLREVIEWS,
    payload: reviews,
  };
};

const resetAllReviews = () => {
  return {
    type: RESET_ALLREVIEW,
  };
};

const setOwnReview = review => {
  return {
    type: SET_OWNREVIEW,
    payload: review,
  };
};

export const loadReviews = spotId => async dispatch => {
  const payload = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const response = await payload.json();
  const { Reviews } = response;
  const allReviews = {};

  if (Reviews) {
    Reviews.forEach(review => {
      allReviews[review.id] = review;
    });
    dispatch(setAllReviews(allReviews));
  }

  return allReviews;
};

export const resetReviews = () => async dispatch => {
  dispatch(resetAllReviews());
  return true;
};

export const fetchOwnReview = id => async dispatch => {
  const payload = await csrfFetch('/api/reviews/current');
  const response = await payload.json();

  //   dispatch(setOwnReview(response));
  return response;
};

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
    case RESET_ALLREVIEW:
      return {
        ...state,
        spot: {},
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
