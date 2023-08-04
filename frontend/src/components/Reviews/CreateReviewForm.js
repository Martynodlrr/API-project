import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../redux/reviews.js";
import * as spotActions from '../../redux/spots.js';
import { useModal } from "../Modal/context/Modal.js";

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
                {errors.message && <p className="error">{ errors.message }</p>}
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
                    <input
                        type="number"
                        value={stars}
                        onChange={e => setStars(e.target.value)}
                        min={1}
                        max={5}
                    />
                </label>
                <button type="submit" disabled={ !stars || review.length < 10 }>Submit Your Review</button>
            </form>
        </>
    );
};

export default CreateReview;
