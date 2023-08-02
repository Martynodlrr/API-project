import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { renderAvgRating } from '../../HelperFuncs.js';
import * as reviewActions from '../../redux/reviews.js';

const ReviewsRender = ({ spotId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews.spot);
    const spot = useSelector(state => state.spots.singleSpot);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(reviewActions.resetReviews());
        dispatch(reviewActions.loadReviews(spotId));
    }, [dispatch, spotId]);
console.log(sessionUser && sessionUser.id)
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
            <button onClick={() => alert("Feature coming soon")}>Reserve</button>
            <div id='lineBreak'></div>
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
                sessionUser && ( spot.ownerId === sessionUser.id ) ?
                <h2>
                    <span className="star">&#9733; </span>
                    New
                    </h2> :
                    <>
                        <h3>Be the first to post a review!</h3>
                        <button>Post a Review</button>
                    </>
            }
        </>
    );
};

export default ReviewsRender;
