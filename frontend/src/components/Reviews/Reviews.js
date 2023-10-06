import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import ConfirmationDeleteModal from '../Modal/DeletionModal/ConfirmationDeleteModal.js';
import OpenModalMenuItem from '../Modal/OpenModalButton/OpenModalMenuItem.js';
import * as reviewActions from '../../redux/reviews.js';
import { renderAvgRating } from '../../HelperFuncs.js';
import { useModal } from '../Modal/context/Modal.js';
import CreateReview from './CreateReviewForm.js';

import './Reviews.css';

const ReviewsRender = ({ spotId }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [reloadKey, setReloadKey] = useState(0);
    const { setModalContent } = useModal();
    const reviews = useSelector(state => state.reviews.spot);
    const ownReviews = useSelector(state => state.reviews.user);
    const sessionUser = useSelector(state => state.session.user);
    const { spot } = useSelector(state => state.spots.singleSpot);

    const spotReview = ownReviews[spotId];


    const handleReviewDelete = (reviewId, spotId) => {
        setModalContent(<ConfirmationDeleteModal spotId={spotId} reviewId={reviewId} slice={'Review'} />);
        setReloadKey(prevKey => prevKey + 1);
    }

    useEffect(() => {
        dispatch(reviewActions.resetReviews());
        dispatch(reviewActions.loadReviews(spotId));
        dispatch(reviewActions.loadOwnReviews())
    }, [dispatch, spotId, reloadKey]);

    if (!spot.Owner) return null;

    return (
        <div id={!Object.keys(reviews).length ? 'empty-review-container' : 'full-reviews-container' }>
            {Object.keys(reviews).length === 0 && (
                <>
                    <h2 className='heading'>
                        <p><span className="stars">&#9733;</span> New &middot; Be the first to post a review! </p>
                    </h2>
                </>
            )}
            <div id='star-review-btn'>
                {Object.keys(reviews).length > 0 && (
                    <h1>
                        <span className="stars">&#9733; </span>{spot.avgStarRating && renderAvgRating(spot.avgStarRating)} &middot; {Object.keys(reviews).length} {Object.keys(reviews).length > 1 ? 'Reviews' : 'Review'}
                    </h1>
                )}

                {sessionUser && Object.keys(sessionUser).length > 0 && sessionUser.id !== spot.Owner.id && !spotReview &&
                    <Button variant="outlined">
                        <OpenModalMenuItem
                            itemText="Post a review"
                            modalComponent={<CreateReview spotId={spotId} theme={theme} />}
                        />
                    </Button>
                }
            </div>

            {Object.keys(reviews).length > 0 && (
                <div className='reviews'>
                    {Object.values(reviews).sort((oldest, newest) => {
                        return new Date(newest.createdAt) - new Date(oldest.createdAt);
                    }).map(review => (
                        <div key={review.id}>
                            <h2>{review.User.firstName}</h2>
                            <p>{review.createdAt.slice(0, 10)}</p>
                            <p id='review'>{review.review}</p>
                            {sessionUser && review.userId === sessionUser.id &&
                                <Button
                                    onClick={() => handleReviewDelete(review.id, spotId)}
                                    variant="contained"
                                    size='small'>
                                    delete
                                </Button>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
};

export default ReviewsRender;
