import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal.js";
import * as sessionActions from "../../redux/spots.js";

import './SpotsRender.css';

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
    const [img, setImg] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false); // New state to track form submission
    const { closeModal } = useModal();

    const validateForm = () => {
        const newErrors = {};
        if (!address) newErrors.address = "Address is required";
        if (!city) newErrors.city = "City is required";
        if (!state) newErrors.state = "State is required";
        if (!country) newErrors.country = "Country is required";
        if (!description) newErrors.description = "Description is required";
        if (!price) newErrors.price = "Price is required";
        if (!previewImg) newErrors.previewImg = "Preview Image is required";
        return newErrors;
      };

    const handleSubmit = e => {
        e.preventDefault();

        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        return dispatch(
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
            }),
            // sessionActions.addImage({
            //     previewImg,
            //     img
            // })
        )
            .then(res => {
                console.log('this is res yo: ', res)
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
                            console.log('what is prevErrors yo: ', prevErrors)
                            return prevErrors;
                        })
                    }
                } else {
                    // if (false) {
                        //     closeModal();
                        //     <Redirect to="/" />
                        // }
                        //   }
                    }
                });
            };
    console.log('what is errors yo: ', errors);

    useEffect(() => {
        if (isSubmitted) {
          const newErrors = validateForm();
          setErrors(newErrors);
        }
      }, [isSubmitted, address, city, state, country, lat, lng, name, description, price, previewImg]);

    return (
        <>
            <h1>Create a New Spot</h1>
            <form className="createSpot" onSubmit={handleSubmit}>
                <h2>Where's your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <label>
                    Street Address
                    {errors.address && <p className="error">{errors.address}</p>}
                    {errors.uniqueAddress && <p className="error">{errors.uniqueAddress}</p>}
                    {console.log('you know what i am yo: ', errors)}
                    <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Address"
                        // required
                        />
                </label>
                <label>
                    City
                        {errors.city && <p className="error">{ errors.city }</p>}
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="City"
                        // required
                        />
                </label>
                <p>,</p>
                <label>
                    State
                        {errors.state && <p className="error">{ errors.state }</p>}
                    <input
                        type="text"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder="State"
                        // required
                        />
                </label>
                <p>,</p>
                <label>
                    Country
                        {errors.country && <p className="error">{ errors.country }</p>}
                    <input
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder="Country"
                        // required
                        />
                </label>
                {/* <label>
                    Latitude
                    <input
                    type="text"
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    />
                    </label>
                    <p>,</p>
                    <label>
                    Longitude
                    <input
                    type="text"
                    value={lng}
                    onChange={e => setLng(e.target.value)}
                    />
                </label> */}
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
                        // required
                        />
                </label>
                        {errors.description && <p className="error">{ errors.description }</p>}
                <div className='lineBreakForm'></div>
                <h2>Create a title for your Spot</h2>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name of your Spot"
                        // required
                        />
                </label>
                        {errors.name && <p className="error">{ errors.name }</p>}
                        {isSubmitted && errors.nameLen && <p className="error">{ errors.nameLen }</p>}
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
                        // required
                        />
                        {errors.price && <p className="error">{ errors.price }</p>}
                </label>
                <div className='lineBreakForm'></div>
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link at least one photo to publish your spot.</p>
                <label>
                    <input
                        type="url"
                        value={previewImg}
                        onChange={e => setPreviewImg(e.target.value)}
                        placeholder="Preview Image URL"
                        // required
                        />
                </label>
                        {errors.previewImg && <p className="error">{ errors.previewImg }</p>}
                <label>
                    <input
                        type="url"
                        value={img}
                        onChange={e => setImg( ...img, img[0] = e.target.value)}
                        placeholder="Image URL"
                        />
                </label>
                <label>
                    <input
                        type="url"
                        value={img}
                        onChange={e => setImg( ...img, img[2] = e.target.value)}
                        placeholder="Image URL"
                        />
                </label>
                <label>
                    <input
                        type="url"
                        value={img}
                        onChange={e => setImg( ...img, img[3] = e.target.value)}
                        placeholder="Image URL"
                        />
                </label>
                <label>
                    <input
                        type="url"
                        value={img}
                        onChange={e => setImg( ...img, img[4] = e.target.value)}
                        placeholder="Image URL"
                    />
                </label>
                <label>
                    <input
                        type="url"
                        value={img}
                        onChange={e => setImg(e.target.value)}
                        placeholder="Image URL"
                        />
                </label>
                <button type="submit">Create Spot</button>
            </form>
                        </>
    );
};

export default CreateSpot;
