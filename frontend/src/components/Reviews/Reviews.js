import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import OpenModalMenuItem from '../OpenModalButton/index.js';
import LoginFormModal from '../LoginFormModal/index.js';
import * as reviewActions from '../../redux/reviews.js';
import { renderAvgRating } from '../../HelperFuncs.js';

const ReviewsRender = ({ spotId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews.spot);
    const ownReviews = useSelector(state => state.reviews.user);
    const spot = useSelector(state => state.spots.singleSpot);
    const sessionUser = useSelector(state => state.session.user);
    const spotReview = ownReviews[spotId];

    useEffect(() => {
        dispatch(reviewActions.resetReviews());
        dispatch(reviewActions.loadReviews(spotId));
        dispatch(reviewActions.loadOwnReviews())
    }, [dispatch, spotId]);

    return (
        <>
            {Object.keys(reviews).length > 0 ?
                <p>
                    <span className="star">&#9733; </span>
                    {spot.avgStarRating && renderAvgRating(spot.avgStarRating)} &middot; {Object.keys(reviews).length} Reviews
                </p> :
                <p>
                    <span className="star">&#9733; </span>
                    New
                </p>
            }
            {
                sessionUser && sessionUser.id !== parseInt(spotId) ?
                    <button onClick={() => alert("Feature coming soon")}>Reserve</button> :
                    !sessionUser ?
                <button className='menuButton'>
                    <OpenModalMenuItem
                    itemText="Log In to reserve"
                    modalComponent={<LoginFormModal />}
                    />
                    </button> :
            null
            }
            <div className='lineBreak'></div>

            {Object.keys(sessionUser).length > 0 && sessionUser.id !== spot.Owner.id && !reviews ?
                <>
                    <h3>Be the first to post a review!</h3>
                    <button className='menuButton'>
                    <OpenModalMenuItem
                    itemText="Post a review"
                    modalComponent={<LoginFormModal />}
                    />
                    </button>
                </> : (Object.keys(sessionUser).length > 0) && sessionUser.id !== spot.Owner.id && !spotReview ?
                <button className='menuButton'>
                <OpenModalMenuItem
                itemText="Post a review"
                modalComponent={<LoginFormModal />}
                />
                </button> : null
            }

            {Object.keys(reviews).length > 0 ?
                <div>
                    <h1>
                        <span className="star">&#9733; </span>{spot.avgStarRating && renderAvgRating(spot.avgStarRating)} &middot; {Object.keys(reviews).length} {Object.keys(reviews).length > 1 ? 'Reviews' : 'Review'}
                    </h1>
                    {Object.values(reviews).sort((oldest, newest) => {
                        return new Date(newest.createdAt) - new Date(oldest.createdAt);
                    }).map(review => (
                        <div key={review.id}>
                            <h2>{review.User.firstName}</h2>
                            <p>{review.createdAt.slice(0, 10)}</p>
                            <p>{review.review}</p>
                        </div>
                    ))}
                </div> :
                <h2>
                    <span className="star">&#9733; </span>
                    New
                </h2>
            }
        </>
    );
};

export default ReviewsRender;
