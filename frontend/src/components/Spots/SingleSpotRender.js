import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import * as spotActions from '../../redux/spots.js';
import ReviewsRender from '../Reviews/Reviews.js';

import './SingleSpotRender.css';

function SingleSpotRender() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const { spot } = useSelector(state => state.spots.singleSpot);

    const previewImageObj = spot && spot.SpotImages ? spot.SpotImages.find(image => image.preview === true) : null;
    const previewImageUrl = previewImageObj ? previewImageObj.url : null;

    const notPreviewImages = spot && spot.SpotImages ? spot.SpotImages.filter(image => image.preview !== true) : null;
    const images = [];

    if (notPreviewImages) notPreviewImages.map(image => (
        images.length === 4 ? null : !image.previewImage ? images.push(image) : null
    ));

    useEffect(() => {
        dispatch(spotActions.fetchSingleSpot(spotId));
    }, [dispatch]);
    
    return spot ? (
        <div id='spot'>
            <h1>{spot.name}</h1>
            <h5>{spot.city}, {spot.state}, {spot.country}</h5>
            <div className='imgContainer'>
                {previewImageUrl && <img src={previewImageUrl} alt={spot.name} className='previewImg' />}
                <div id='regularImgs'>
                    {images && images.map(image => (
                        image.url &&
                        < img key={image.id} src={image.url} alt={spot.name} className='notPreviewImg' />
                    ))}
                </div>
            </div>
            {spot.Owner && <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>}
            <p id='description'>Description: {spot.description}</p>
            <div id='price'>
                <p>${spot.price} a night</p>
            </div>
            <ReviewsRender spotId={spotId} />
        </div>
    ) : (
        <>Loading...</>
    );
};

export default SingleSpotRender;
