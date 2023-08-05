import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import * as spotActions from '../../redux/spots.js';
import { useModal } from '../Modal/context/Modal.js';

import './SpotsRender.css';

const UpdateSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImg, setPreviewImg] = useState('');
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { closeModal } = useModal();
    const history = useHistory();

    useEffect(() => {
        dispatch(spotActions.fetchSingleSpot(spotId));
    }, [dispatch]);

    const validateForm = () => {
        const newErrors = {};
        if (!address) newErrors.address = "Address is required";
        if (!city) newErrors.city = "City is required";
        if (!state) newErrors.state = "State is required";
        if (!country) newErrors.country = "Country is required";
        if (!description) newErrors.description = "Description is required";
        if (!price) newErrors.price = "Price is required";
        if (!images[0] || !images[0].url) newErrors.previewImg = "Preview Image is required";
        return newErrors;
    };

    const handleSubmit = e => {
        e.preventDefault();

        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        dispatch(
            spotActions.fetchUpdateSpot({
                address,
                city,
                state,
                country,
                name,
                description,
                price,
                spotId,
            }))
            .then(res => {
                if (res.errors) {
                    for (const error of res.errors) {
                        setErrors(prevErrors => {

                            if (error.startsWith('Name must be between 1 and 50')) return {
                                ...prevErrors, nameLen: 'Name must be between 1 and 50 charaters long.'
                            }
                            if (error.startsWith('address must be unique')) return {
                                ...prevErrors, uniqueAddress: 'address must be unique'
                            };
                            if (description && description.length < 30) return { ...prevErrors, description: 'Description needs 30 or more characters' };
                            return prevErrors;
                        })
                    }
                } else {
                    if (res.ok) {
                        const { id } = res;
                        dispatch(spotActions.addSpotImages({
                            previewImg: images[0],
                            images: images.slice(1),
                            spotId: id,
                            updating: true,
                        }))
                            .then(() => {
                                closeModal();
                                history.push(`/spots/${id}`);
                            })
                    }
                }
            });
    };

    useEffect(() => {
        if (spot.spotData) {
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setCountry(spot.country);
            setName(spot.name);
            setDescription(spot.description);
            setPrice(spot.price);
            const spotImages = spot.SpotImages
            .filter(image => image.url !== '')
                .map(image => ({ ...image }));
            setImages(spotImages);
        }
    }, [isSubmitted, spot]);

    return (
        <>
            <h1>Update your Spot</h1>
            <form className="updateSpot" onSubmit={handleSubmit}>
                <h2>Where's your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <label>
                    Street Address
                    {errors.address && <p className="error">{errors.address}</p>}
                    {errors.uniqueAddress && <p className="error">{errors.uniqueAddress}</p>}
                    <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Address"
                    />
                </label>
                <label>
                    City
                    {errors.city && <p className="error">{errors.city}</p>}
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="City"
                    />
                </label>
                <p>,</p>
                <label>
                    State
                    {errors.state && <p className="error">{errors.state}</p>}
                    <input
                        type="text"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder="State"
                    />
                </label>
                <p>,</p>
                <label>
                    Country
                    {errors.country && <p className="error">{errors.country}</p>}
                    <input
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder="Country"
                    />
                </label>
                <div className='lineBreakForm'></div>
                <h2>Describe your place to guest</h2>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <label>
                    <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        minLength={30}
                        placeholder="Please write at least 30 characters"
                    />
                </label>
                {errors.description && <p className="error">{errors.description}</p>}
                <div className='lineBreakForm'></div>
                <h2>Create a title for your Spot</h2>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name of your Spot"
                    />
                </label>
                {errors.name && <p className="error">{errors.name}</p>}
                {isSubmitted && errors.nameLen && <p className="error">{errors.nameLen}</p>}
                <div className='lineBreakForm'></div>
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <label>
                    $
                    <input
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="Price per night (USD)"
                        min={1}
                        max={9999999999}
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
                </label>
                <div className='lineBreakForm'></div>
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link at least one photo to publish your spot.</p>
                {images.length && <label>
                    <input
                        type="url"
                        value={images[0].url || ''}
                        onChange={e => {
                            const updatedImage = { ...images[0], url: e.target.value };
                            setImages([updatedImage, ...images.slice(1)]);
                            setPreviewImg(updatedImage);
                        }}
                        placeholder="Preview Image URL"
                    />
                </label>}
                {errors.previewImg && <p className="error">{errors.previewImg}</p>}
                <label>
                    <input
                        type="url"
                        value={images[1]?.url || ''}
                        onChange={e => setImages([images[0], { ...images[1], url: e.target.value }, ...images.slice(2)])}
                        placeholder="Image URL"
                    />
                </label>
                <label>
                    <input
                        type="url"
                        value={images[2]?.url || ''}
                        onChange={e => setImages([...images.slice(0, 2), { ...images[2], url: e.target.value }, ...images.slice(3)])}
                        placeholder="Image URL"
                    />
                </label>
                <label>
                    <input
                        type="url"
                        value={images[3]?.url || ''}
                        onChange={e => setImages([...images.slice(0, 3), { ...images[3], url: e.target.value }, ...images.slice(4)])}
                        placeholder="Image URL"
                    />
                </label>
                <label>
                    <input
                        type="url"
                        value={images[4]?.url || ''}
                        onChange={e => setImages([...images.slice(0, 4), { ...images[4], url: e.target.value }])}
                        placeholder="Image URL"
                    />
                </label>
                <button type="submit">Update your Spot</button>
            </form>
        </>
    );
};

export default UpdateSpot;
