import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';

import * as spotActions from '../../../redux/spots.js';
import * as reviewActions from '../../../redux/reviews.js';
import { useModal } from "../context/Modal.js";

import './ConfirmationDeleteModal.css'

function ConfirmationDeleteModal({ reviewId, spotId, slice, theme }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        slice === 'Spot' ? await dispatch(spotActions.fetchRemoveOwnSpot(spotId)) : await dispatch(reviewActions.thunkDeleteReveiw(reviewId, parseInt(spotId)));
        closeModal();
    };

    return (
        <>
            <h1 className="heading">Confirm Delete</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2 className="heading">Are you sure you want to remove this {slice.toLowerCase()}?</h2>
                    <div className="btn">
                        <Button id="confirm-btn" type="submit" variant="contained">Yes {`(Delete ${slice})`}</Button>
                        <Button id="deny-btn"
                            type="button"
                            onClick={() => closeModal()}
                            variant="outlined"
                            style={{
                                color: theme.palette.primary.main,
                                borderColor: theme.palette.primary.main
                            }}>No {`(Keep ${slice})`}</Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ConfirmationDeleteModal;
