import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaStar } from 'react-icons/fa';

import * as sessionActions from "../../redux/reviews.js";
import * as spotActions from '../../redux/spots.js';
import { useModal } from "../Modal/context/Modal.js";

import './CreateReviewForm.css'

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const starValue = index + 1;

                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={starValue}
                            onClick={() => setRating(starValue)}
                        />
                        <FaStar
                            className="star"
                            color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={20}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

const CreateReview = id => {
    const { spotId } = id;
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(1);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const [isSubmitted, setIsSubmitted] = useState(false);


    const history = useHistory();

    const validateForm = () => {
        const newErrors = {};
        if (!review) newErrors.review = "review is required";
        if (!stars) newErrors.stars = "stars is required";
        return newErrors;
    };

    const handleSubmit = e => {
        e.preventDefault();

        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        dispatch(
            sessionActions.thunkPostReveiw({
                review,
                stars,
                spotId
            }))
            .then(res => {
                if (res.ok) {
                    dispatch(sessionActions.loadReviews(spotId));
                    dispatch(spotActions.fetchSingleSpot(spotId));

                    closeModal();
                    history.push(`/spots/${spotId}`);
                } else {
                    return setErrors({ ...errors, message: res.message });
                }
            });
    };

    useEffect(() => {
        if (isSubmitted) {
            const newErrors = validateForm();
            setErrors(newErrors);
        }
    }, [isSubmitted, review, stars]);

    return (
        <>
            <form className="createReview" onSubmit={handleSubmit}>
                <h2>How was your stay?</h2>
                {errors.message && <p className="error">{errors.message}</p>}
                <label>
                    {errors.review && <p className="error">{errors.review}</p>}
                    {errors.uniqueAddress && <p className="error">{errors.uniqueAddress}</p>}
                    <input
                        type="text"
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        placeholder="Leave your review here..."
                    />
                </label>
                <label>
                    {errors.stars && <p className="error">{errors.stars}</p>}
                    Stars
                    <StarRating rating={stars} setRating={setStars} />
                </label>
                <button type="submit" disabled={!stars || review.length < 10}>Submit Your Review</button>
            </form>
        </>
    );
};

export default CreateReview;
