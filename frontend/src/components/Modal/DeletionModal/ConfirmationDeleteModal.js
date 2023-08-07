import { useDispatch } from "react-redux";

import * as spotActions from '../../../redux/spots.js';
import * as reviewActions from '../../../redux/reviews.js';
import { useModal } from "../context/Modal.js";

import './ConfirmationDeleteModal.css'

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
            <h1 id="confirm">Confirm Delete</h1>
            <form onSubmit={handleSubmit}>
                <div id="formBakcground">
                    <h2>Are you sure you want to remove this {slice.toLowerCase()}?</h2>
                    <div id="confirmDeleteButtonYes">
                        <button type="submit">Yes {`(Delete ${slice})`}</button>
                    </div>
                    <div id="confirmDeleteButtonNo">
                        <button type="button" onClick={() => closeModal()}>No {`(Keep ${slice})`}</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ConfirmationDeleteModal;
