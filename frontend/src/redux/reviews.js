import * as spotActions from './spots.js';
import { csrfFetch } from "./csrf";

const SET_ALLREVIEWS = "reviews/setAllReviews";
const RESET_ALLREVIEW = "reviews/resetAllReview";
const SET_OWNREVIEWS = "review/setSingleReview";
const POST_REVIEW = 'review/postReview';
const DELETE_REVIEW = 'review/deleteReview';

const setAllReviews = (reviews, avgRating) => {
  return {
    type: SET_ALLREVIEWS,
    payload: { reviews, avgRating },
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

const deleteReview = (reviewId, spotId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
    spotId,
  };
};

export const loadReviews = spotId => async dispatch => {
  const payload = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const response = await payload.json();
  const { Reviews, avgRating } = response;
  const allReviews = {};

  if (Reviews) {
    Reviews.forEach(review => {
      allReviews[review.id] = review;
    });
    dispatch(setAllReviews(allReviews, avgRating));
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

export const thunkPostReveiw = reviewData => async dispatch => {
  const { review, stars, spotId } = reviewData;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ review, stars: parseInt(stars) })
  };

  const payload = await csrfFetch(`/api/spots/${spotId}/reviews`, options);
  const response = await payload.json();

  dispatch(postReview({ spotId, response }));
  return { ...response, ok: true};
};

export const thunkDeleteReveiw = (reviewId, spotId) => async dispatch => {
  const options = {
    method: "DELETE"
  };

  const payload = await csrfFetch(`/api/reviews/${reviewId}`, options);
  const response = await payload.json();
  const { message } = response;

  if (payload.ok) {
    dispatch(deleteReview(reviewId, spotId));
    dispatch(spotActions.fetchSingleSpot(spotId));

    return { message, ok: true };
  } else {

    return message;
  };
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
        spot: { ...state.spot, ...action.payload.reviews }
      };
    case RESET_ALLREVIEW:
      return {
        ...state,
        spot: {},
      };
      case SET_OWNREVIEWS:
        return {
          ...state,
          user: { ...action.payload }
        };
    case POST_REVIEW:
      const { spotId, response } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          [spotId]: response
        }
      };
    case DELETE_REVIEW:
      const newState = { ...state };
      delete newState.spot[action.reviewId];
      delete newState.user[action.spotId];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
