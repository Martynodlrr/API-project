import { useDispatch } from "react-redux";

import * as spotActions from '../../../redux/spots.js';
import * as reviewActions from '../../../redux/reviews.js';
import { useModal } from "../context/Modal.js";

function ConfirmationDeleteModal({ reviewId, spotId, slice }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        slice === 'Spot' ? await dispatch(spotActions.fetchRemoveOwnSpot(spotId)) : await dispatch(reviewActions.thunkDeleteReveiw(reviewId, parseInt(spotId)));
        closeModal();
    };

    return (
        <>
            <h1>Confirm Delete</h1>
            <form onSubmit={handleSubmit}>
                <h2>Are you sure you want to remove this {slice.toLowerCase()}?</h2>
                <button type="submit">Yes {`(Delete ${slice})`}</button>
                <button type="button" onClick={() => closeModal()}>No {`(Keep ${slice})`}</button>
            </form>
        </>
    );
};

export default ConfirmationDeleteModal;
