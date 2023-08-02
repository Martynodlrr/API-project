import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { renderAvgRating } from '../../HelperFuncs.js';
import * as spotActions from '../../redux/spots.js';
import ReviewsRender from '../Reviews/Reviews.js';

function SingleSpotRender() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots.singleSpot);
    const previewImageObj = spot.SpotImages.find(image => image.preview === true);
    const previewImage = previewImageObj ? previewImageObj.url : null;

    const notPreviewImages = spot.SpotImages.filter(image => image.preview !== true);
    const images = [];

    notPreviewImages.map(image => (
        images.length === 4 ? null : !image.previewImage ? images.push(image) : null
    ));

    useEffect(() => {
        dispatch(spotActions.fetchSingleSpot(id));
    }, [dispatch]);

    return spot ? (
        <>
            <h1>{spot.name}</h1>
            <h5>{spot.city}, {spot.state}, {spot.country}</h5>
            {previewImage && <img src={previewImage} alt={spot.name} className='previewImg' />}
            {images && images.map(image => (
                <img key={image.id} src={image.url} alt={spot.name} className='notPreviewImg' />
            ))}
            <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
            <p>Description: {spot.description}</p>
            <p>${spot.price} a night</p>
            <ReviewsRender spotId={id} />
        </>
    ) : (
        <>Loading...</>
    );
};

export default SingleSpotRender;
