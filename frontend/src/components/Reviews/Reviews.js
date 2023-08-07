import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import ConfirmationDeleteModal from '../Modal/DeletionModal/ConfirmationDeleteModal.js';
import LoginFormModal from '../Modal/SessionModal/LoginFormPage/LoginFormModal.js';
import OpenModalMenuItem from '../Modal/OpenModalButton/OpenModalMenuItem.js';
import * as reviewActions from '../../redux/reviews.js';
import { renderAvgRating } from '../../HelperFuncs.js';
import { useModal } from '../Modal/context/Modal.js';
import CreateReview from './CreateReviewForm.js';

// import './Reviews.css';

const ReviewsRender = ({ spotId }) => {
    const dispatch = useDispatch();
    const [reloadKey, setReloadKey] = useState(0);
    const { setModalContent } = useModal();
    const reviews = useSelector(state => state.reviews.spot);
    const ownReviews = useSelector(state => state.reviews.user);
    const { Spots } = useSelector(state => state.spots.singleSpot);
    const sessionUser = useSelector(state => state.session.user);
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

    if (!Spots.Owner) return null;

    return (
        <>
        <div className="reserve-container">
            <div className="reserve-info">
                {reviews && Object.keys(reviews).length > 0 ? (
                    <p>
                        <span className="star">&#9733; </span>
                        {Spots.avgStarRating && renderAvgRating(Spots.avgStarRating)} &middot; {Object.keys(reviews).length} Reviews
                    </p>
                ) : (
                    <p>
                        <span className="star">&#9733; </span>
                        New
                    </p>
                )}

                {sessionUser && sessionUser.id !== Spots.ownerId ? (
                    <button className="reserve-button" onClick={() => alert("Feature coming soon")}>Reserve</button>
                ) : (
                    !sessionUser && (
                        <button className='menuButton'>
                            <OpenModalMenuItem
                                itemText="Log In to reserve"
                                modalComponent={<LoginFormModal />}
                            />
                        </button>
                    )
                )}
            </div>
        </div>

            <div id='reviewLinebreak' className='lineBreak'></div>

            {Object.keys(reviews).length > 0 && (
                <h1>
                    <span className="star">&#9733; </span>{Spots.avgStarRating && renderAvgRating(Spots.avgStarRating)} &middot; {Object.keys(reviews).length} {Object.keys(reviews).length > 1 ? 'Reviews' : 'Review'}
                </h1>
            )}

            {sessionUser && Object.keys(sessionUser).length > 0 && sessionUser.id !== Spots.Owner.id && !spotReview &&
                <button className='menuButton'>
                    <OpenModalMenuItem
                        itemText="Post a review"
                        modalComponent={<CreateReview spotId={spotId} />}
                    />
                </button>
            }

            {Object.keys(reviews).length > 0 ? (
                <div>
                    {Object.values(reviews).sort((oldest, newest) => {
                        return new Date(newest.createdAt) - new Date(oldest.createdAt);
                    }).map(review => (
                        <div key={review.id}>
                            <h2>{review.User.firstName}</h2>
                            <p>{review.createdAt.slice(0, 10)}</p>
                            <p>{review.review}</p>
                            {sessionUser && review.userId === sessionUser.id && <button onClick={() => handleReviewDelete(review.id, spotId)}>delete</button>}
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <h2>
                        <p>Be the first to post a review!</p>
                        <span className="star">&#9733; </span>
                        New
                    </h2>
                </>
            )}
        </>
    )
};

export default ReviewsRender;
