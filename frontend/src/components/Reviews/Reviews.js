import { useDispatch, useSelector, UseSelector } from 'react-redux';
import { useEffect } from 'react';

import * as sessionActions from '../../redux/reviews.js';

const ReviewsRender = () => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews.spot)
console.log(reviews)
    useEffect(() => {
        dispatch(sessionActions.loadReviews());
    }, [dispatch]);

    return reviews ? (
        <>
        </>
    ) : (
        <>Loading...</>
    );
};

export default ReviewsRender;
