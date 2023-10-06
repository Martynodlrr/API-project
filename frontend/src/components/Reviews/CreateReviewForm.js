import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import * as sessionActions from "../../redux/reviews.js";
import * as spotActions from '../../redux/spots.js';
import { useModal } from "../Modal/context/Modal.js";

const CreateReview = ({ spotId, theme }) => {
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(1);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const history = useHistory();

    const validateForm = () => {
        const newErrors = {};
        if (!review) newErrors.review = "Review is required";
        if (!stars) newErrors.stars = "Star rating is required";
        return newErrors;
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;
        const res = await dispatch(
            sessionActions.thunkPostReveiw({
                review,
                stars,
                spotId
            })
        );

        if (res.ok) {
            dispatch(sessionActions.loadReviews(spotId));
            dispatch(spotActions.fetchSingleSpot(spotId));

            closeModal();
            history.push(`/spots/${spotId}`);
        } else {
            setErrors({ ...errors, message: res.message });
        }
    };

    useEffect(() => {
        if (isSubmitted) {
            const newErrors = validateForm();
            setErrors(newErrors);
        }
    }, [isSubmitted, review, stars]);

    return (
        <form
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}
            id="create-review-form"
        >
            <h2 className="heading">How was your stay?</h2>

            {errors.message &&
                <Typography
                    sx={{ color: 'red' }}
                >
                    {errors.message}
                </Typography>
            }

            <TextField
                value={review}
                onChange={e => setReview(e.target.value)}
                placeholder="Leave your review here..."
                label="Review"
                variant="standard"
                error={Boolean(errors.review)}
                helperText={errors.review}
                sx={{
                    '& label.Mui-focused': {
                        color: '#000000',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#000000',
                    },
                }}
            />

            <div>
                <Typography variant="body1" gutterBottom>Stars</Typography>
                <Rating
                    value={stars}
                    onChange={(event, newValue) => {
                        if (newValue !== null) {
                            setStars(parseFloat(newValue));
                        }
                    }}
                    precision={0.5}
                    size="large"
                />
                {errors.stars &&
                    <Typography
                        sx={{ color: 'red' }}
                    >
                        {errors.stars}
                    </Typography>
                }
            </div>

            <Button
                type="submit"
                variant="contained"
                disabled={!stars || review.length < 10}
                style={{ backgroundColor: theme.palette.primary.main }}>
                Submit Your Review
            </Button>
        </form>
    );
};

export default CreateReview;
