import LoginFormModal from '../Modal/SessionModal/LoginFormPage/LoginFormModal.js';
import OpenModalMenuItem from '../Modal/OpenModalButton/OpenModalMenuItem.js';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import GoogleMapRender from '../GoogleMapsRender/index.js'
import { renderAvgRating } from '../../HelperFuncs.js';
import * as spotActions from '../../redux/spots.js';
import ReviewsRender from '../Reviews/Reviews.js';

import './SingleSpotRender.css';

function SingleSpotRender() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();

    const reviews = useSelector(state => state.reviews.spot);
    const sessionUser = useSelector(state => state.session.user);
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
                                <IconButton disabled={currentImageIndex === 0} onClick={prevImage}>
                                    <ArrowBackIcon fontSize='small' className='buttons' />
                                </IconButton>
                                <IconButton disabled={currentImageIndex === allImages.length - 1} onClick={nextImage}>
                                    <ArrowForwardIcon fontSize='small' className='buttons' />
                                </IconButton>
                            </div>
                        )}
                    </>
                }
                <div id='spot-info'>
                    <div>
                        <p id='spot-owner-info'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
                        <p id='description'>Description: {spot.description}</p>
                    </div>
                    <div id='price-review-reserve'>
                        <div id='price-review'>
                            <p id='price'>${spot.price} a night</p>
                            {reviews && Object.keys(reviews).length > 1 ? (
                                <p>
                                    <span className="star">&#9733; </span>
                                    {spot.avgStarRating && renderAvgRating(spot.avgStarRating)} &middot; {Object.keys(reviews).length} Reviews
                                </p>
                            ) : reviews && Object.keys(reviews).length === 1 ? (
                                <p>
                                    <span className="star">&#9733; </span>
                                    {spot.avgStarRating && renderAvgRating(spot.avgStarRating)} &middot; {Object.keys(reviews).length} Reviews
                                </p>
                            ) : (
                                <p>
                                    <span className="star">&#9733; </span>
                                    New
                                </p>
                            )}
                        </div>

                        <div id='reserve-btn'>
                            {
                                sessionUser && sessionUser.id !== spot.ownerId ? (
                                    <Button className="reserve-button" onClick={() => alert("Feature coming soon")} variant="contained">Reserve</Button>
                                ) : !sessionUser ? (
                                    <Button className='menuButton' variant="contained">
                                        <OpenModalMenuItem
                                            itemText="Log In to reserve"
                                            modalComponent={<LoginFormModal theme={theme} />}
                                        />
                                    </Button>
                                ) : (
                                    <Button className='updateButton' variant="contained" href={`/spots/${spot.id}/edit`}>Update</Button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div id='reviewLinebreak' className='lineBreak'></div>
            <div id={!spot.numReviews ? 'review-container' : 'reviews-container'}>
                <ReviewsRender spotId={spotId} />
            <div id='google-maps-container'>
                <GoogleMapRender spot={ spot } />
            </div>
            </div>
        </div>
    ) : (
        <>Loading...</>
    );
};

export default SingleSpotRender;
