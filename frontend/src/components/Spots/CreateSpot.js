import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import * as sessionActions from "../../redux/spots.js";
import { useModal } from '../Modal/context/Modal.js';

import './FormStyle.css';

const CreateSpot = () => {
    const dispatch = useDispatch();
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
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const validateForm = () => {
        const newErrors = {};
        if (!address) newErrors.address = "Address is required";
        if (!city) newErrors.city = "City is required";
        if (!state) newErrors.state = "State is required";
        if (!country) newErrors.country = "Country is required";
        if (!description) newErrors.description = "Description needs a minimum of 30 characters";
        if (!price) newErrors.price = "Price is required";
        if (!previewImg) newErrors.previewImg = "Preview Image is required";
        return newErrors;
    };

    const handleSubmit = e => {
        e.preventDefault();

        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        dispatch(
            sessionActions.createSpot({
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
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

                        dispatch(sessionActions.addSpotImages({
                            previewImg,
                            images: images.filter(image => image),
                            spotId: id,
                            sessionUser
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
        if (isSubmitted) {
            const newErrors = validateForm();
            setErrors(newErrors);
        }
    }, [isSubmitted, address, city, state, country, lat, lng, name, description, price, previewImg]);

    return (
        <>
            <h1>Create a New Spot</h1>
            <form className="handleSpot" onSubmit={handleSubmit}>
                <h2>Where's your place located?</h2>
                <p>Guests will only get your exact address once they book a reservation.</p>
                    {errors.address && <p className="error">{errors.address}</p>}
                    {errors.uniqueAddress && <p className="error">{errors.uniqueAddress}</p>}
                <label>
                    Street Address
                    <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Address"
                    />
                </label>
                <div id="locationErrors">
                    {errors.city && <p className="error">{errors.city}</p>}
                    {errors.state && <p className="error">{errors.state}</p>}
                    {errors.country && <p className="error">{errors.country}</p>}
                </div>
                <div className="locationContainer">
                    <label>
                        City
                        <input
                            type="text"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="City"
                        />
                    </label>
                    <label>
                        State
                        <input
                            type="text"
                            value={state}
                            onChange={e => setState(e.target.value)}
                            placeholder="State"
                        />
                    </label>
                    <label>
                        Country
                        <input
                            type="text"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            placeholder="Country"
                        />
                    </label>
                </div>
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
                        id="description"
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
                <div className="priceContainer">
                    <label>
                        <span>$</span>
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            placeholder="Price per night (USD)"
                            min={1}
                            max={9999999999.99}
                        />
                    </label>
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>
                <div className='lineBreakForm'></div>
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link at least one photo to publish your spot.</p>
                <label>
                    <input
                        type="url"
                        value={previewImg}
                        onChange={e => setPreviewImg(e.target.value)}
                        placeholder="Preview Image URL"
                    />
                </label>
                {errors.previewImg && <p className="error">{errors.previewImg}</p>}
                <label>
                    <input
                        type="url"
                        value={images[0] || ''}
                        onChange={e => setImages([e.target.value, ...images.slice(1)])}
                        placeholder="Image URL"
                    />
                </label>
                <label>
                    <input
                        type="url"
                        value={images[1] || ''}
                        onChange={e => setImages([images[0], e.target.value, ...images.slice(2)])}
                        placeholder="Image URL"
                    />
                </label>
                <label>
                    <input
                        type="url"
                        value={images[2] || ''}
                        onChange={e => setImages([...images.slice(0, 2), e.target.value, ...images.slice(3)])}
                        placeholder="Image URL"
                    />
                </label>
                <label>
                    <input
                        type="url"
                        value={images[3] || ''}
                        onChange={e => setImages([...images.slice(0, 3), e.target.value, ...images.slice(4)])}
                        placeholder="Image URL"
                    />
                </label>
                <button type="submit">Create Spot</button>
            </form>
        </>

    );
};

export default CreateSpot;
