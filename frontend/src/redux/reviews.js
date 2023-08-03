import { csrfFetch } from "./csrf";

const SET_ALLREVIEWS = "reviews/setAllReviews";
const RESET_ALLREVIEW = "reviews/resetAllReview";
const SET_OWNREVIEWS = "review/setSingleReview";
const POST_REVIEW = 'review/postReview'

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

const setOwnReview = ownReviews => {
  return {
    type: SET_OWNREVIEWS,
    payload: ownReviews,
  };
};

const postReview = review => {
  return {
    type: POST_REVIEW,
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

export const loadOwnReviews = () => async dispatch => {
  const payload = await csrfFetch('/api/reviews/current');
  const response = await payload.json();
  console.log(response)

  const { Reviews } = response;
  const ownReviews = {};
  if (Reviews && Reviews.length) {
    Reviews.forEach(review => {
      ownReviews[review.spotId] = review;
    })
    dispatch(setOwnReview(ownReviews));
  };

  return response;
};

export const thunkPostReveiw = review => async dispatch => {
  const { review, stars, spotId } = review;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ review, stars })
  };

  const payload = await csrfFetch(`/spots/${ spotId }/reviews`, options);
  const response = await payload.json();

console.log('what is response yo: ', response)

    // dispatch(SET_OWNREVIEWS(response));
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
    case SET_OWNREVIEWS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reviewsReducer;
