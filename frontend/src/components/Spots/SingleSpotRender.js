import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as spotActions from '../../redux/spots.js';
import ReviewsRender from '../Reviews/Reviews.js';

import './SingleSpotRender.css';

function SingleSpotRender() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const { spot } = useSelector(state => state.spots.singleSpot);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        dispatch(spotActions.fetchSingleSpot(spotId));
    }, [dispatch, spotId]);

    if (spot && spot.id !== parseInt(spotId)) return null;

    const allImages = spot && spot.SpotImages ? spot.SpotImages : [];

    const nextImage = () => {
        if (currentImageIndex < allImages.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
        }
    };

    const prevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
        }
    };

    return spot ? (
        <div id='spot'>
            <h1 className='heading'>{spot.name}</h1>
            <h5 className='heading'>{spot.city}, {spot.state}, {spot.country}</h5>
            <div className='img-container'>
                {allImages.length > 0 &&
                    <>
                        <img src={allImages[currentImageIndex].url} alt={spot.name} className='current-img' />
                        {allImages.length > 1 && (
                        <div id='pagination-buttons'>
                            <IconButton disabled={currentImageIndex === 0}>
                                <ArrowBackIcon fontSize='small' onClick={prevImage} className='buttons'/>
                            </IconButton>
                            <IconButton disabled={currentImageIndex === allImages.length - 1}>
                                <ArrowForwardIcon fontSize='small' onClick={nextImage} className='buttons'/>
                            </IconButton>
                        </div>
                        )}
                    </>
                }
            </div>
            <p id='spot-owner-info'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
            <p id='description'>Description: {spot.description}</p>
            <p id='price'>${spot.price} a night</p>
            <ReviewsRender spotId={spotId} />
        </div>
    ) : (
        <>Loading...</>
    );
};

export default SingleSpotRender;
