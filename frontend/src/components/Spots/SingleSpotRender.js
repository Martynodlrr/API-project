import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import * as spotActions from '../../redux/spots.js';
import ReviewsRender from '../Reviews/Reviews.js';

// import './SingleSpotRender.css';

function SingleSpotRender() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const { Spots } = useSelector(state => state.spots.singleSpot);

    const previewImageObj = Spots && Spots.SpotImages ? Spots.SpotImages.find(image => image.preview === true) : null;
    const previewImageUrl = previewImageObj ? previewImageObj.url : null;

    const notPreviewImages = Spots && Spots.SpotImages ? Spots.SpotImages.filter(image => image.preview !== true) : null;
    const images = [];

    if (notPreviewImages) notPreviewImages.map(image => (
        images.length === 4 ? null : !image.previewImage ? images.push(image) : null
    ));

    useEffect(() => {
        dispatch(spotActions.fetchSingleSpot(spotId));
    }, [dispatch]);

    return Spots ? (
        <div id='spot'>
            <h1>{Spots.name}</h1>
            <h5>{Spots.city}, {Spots.state}, {Spots.country}</h5>
            <div className='imgContainer'>
                {previewImageUrl && <img src={previewImageUrl} alt={Spots.name} className='previewImg' />}
                <div id='regularImgs'>
                    {images && images.map(image => (
                        image.url &&
                        < img key={image.id} src={image.url} alt={Spots.name} className='notPreviewImg' />
                    ))}
                </div>
            </div>
            {Spots.Owner && <p>Hosted by {Spots.Owner.firstName} {Spots.Owner.lastName}</p>}
            <p>Description: {Spots.description}</p>
            <p id='price'>${Spots.price} a night</p>
            <ReviewsRender spotId={spotId} />
        </div>
    ) : (
        <>Loading...</>
    );
};

export default SingleSpotRender;
