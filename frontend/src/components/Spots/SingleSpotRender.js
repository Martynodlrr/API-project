import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as sessionActions from '../../redux/spots.js';

function SingleSpotRender() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots.singleSpot);
    const previewImageObj = spot.SpotImages.find(image => image.preview === true);
    const previewImage = previewImageObj ? previewImageObj.url : null;

    const notPreviewImages = spot.SpotImages.filter(image => image.preview !== true);

    useEffect(() => {
        dispatch(sessionActions.fetchSingleSpot(id));
    }, [dispatch]);

    return spot ? (
        <>
            <h1>{spot.name}</h1>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
            {previewImage && <img src={previewImage} alt={spot.name} />}
            {notPreviewImages.map((image, index) => (
                <img key={index} src={image.url} alt={spot.name} className="notPreviewImg" />
            ))}
            <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
            <p>Description: {spot.description}</p>
            <p>{`Average stars: ${spot.avgStarRating}` || 'New'}</p>
            <p>${spot.price} a night</p>
            <button onClick={() => alert("Feature coming soon")}>Reserve</button>
        </>
    ) : (
        <>Loading...</>
    );
};

export default SingleSpotRender;
