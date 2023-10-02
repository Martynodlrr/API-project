import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextareaAutosize, TextField } from '@mui/material';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';

import InputFileUpload from '../InputFileUpload/InputFileUpload.js';
import { useModal } from '../Modal/context/Modal.js';
import * as spotActions from '../../redux/spots.js';

import './FormStyle.css';

const UpdateSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const { spot } = useSelector(state => state.spots.singleSpot);
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
    }, [dispatch, spotId]);

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

    const updatePreviewImage = e => {
        const file = e.target.files[0];
        if (file) setPreviewImg(file);
        console.log(previewImg);
        console.log(file);
    };

    const updateImageArray = (index) => (e) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
        }
        console.log(images);
        console.log(file);
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
                            if (error.startsWith('Name')) return {
                                ...prevErrors, nameLen: 'Name must be between 1 and 50 characters long.'
                            };
                            if (error.startsWith('address')) return {
                                ...prevErrors, uniqueAddress: 'Address must be unique'
                            };
                            if (description && description.length < 30) return { ...prevErrors, description: 'Description' };
                            return prevErrors;
                        });
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
                            });
                    }
                }
            });
    };

    useEffect(() => {
        if (spot) {
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
    }, [spot]);

    return (
        <>
            <h1 className='formTitle'>Update Spot</h1>
            <form onSubmit={handleSubmit} className='formContainer'>
                {/* Location Section */}
                <h2>Where's your place located?</h2>
                <p>Guests will only get your exact address once they book a reservation.</p>
                <TextField value={address} onChange={e => setAddress(e.target.value)} label="Street Address" variant="standard" required />
                {errors.address && <p className='error'>{errors.address}</p>}
                <TextField value={city} onChange={e => setCity(e.target.value)} label="City" variant="standard" required />
                {errors.city && <p className='error'>{errors.city}</p>}
                <TextField value={state} onChange={e => setState(e.target.value)} label="State" variant="standard" required />
                {errors.state && <p className='error'>{errors.state}</p>}
                <TextField value={country} onChange={e => setCountry(e.target.value)} label="Country" variant="standard" required />
                {errors.country && <p className='error'>{errors.country}</p>}

                {/* Description Section */}
                <h2>Describe your place to guest</h2>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <TextareaAutosize minRows={3} value={description} onChange={e => setDescription(e.target.value)} required style={{ minWidth: "300px", minHeight: "75px", maxWidth: "500px", maxHeight: "150px" }} placeholder="Please write at least 30 characters, up to 300." />
                {errors.description && <p className='error'>{errors.description}</p>}

                {/* Title Section */}
                <h2>Create a title for your Spot</h2>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <TextField value={name} onChange={e => setName(e.target.value)} label="Name of your Spot" variant="standard" required />
                {errors.name && <p className='error'>{errors.name}</p>}

                {/* Price Section */}
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <TextField type="number" value={price} onChange={e => setPrice(e.target.value)} label="Price (USD)" variant="standard" required placeholder="Per Night" inputProps={{ min: 1, max: 9999999999.99, step: "0.01" }} />
                {errors.price && <p className='error'>{errors.price}</p>}

                {/* Photo Upload Section */}
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>

                {/* Preview Image section */}
                <div style={{ marginBottom: '10px' }}>
                    {<img src={images[0].url} alt="Preview" style={{ maxWidth: '200px', marginBottom: '10px' }} />}
                    <InputFileUpload
                        label="Upload Preview Image"
                        startIcon={<CloudUploadIcon />}
                        onChange={updatePreviewImage}
                    />
                </div>
                {errors.previewImg && <p className='error' style={{ marginBottom: '10px' }}>{errors.previewImg}</p>}

                {/* Additional Images */}
                {[0, 1, 2, 3].map((index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        {/* Display existing image from the database, if present */}
                        {images[index + 1] && <img src={images[index + 1].url} alt={`Image ${index + 1}`} style={{ maxWidth: '200px', marginBottom: '10px' }} />}
                        <InputFileUpload
                            label={`Image #${index + 1}`}
                            startIcon={<CloudUploadIcon />}
                            onChange={updateImageArray(index)}
                        />
                    </div>
                ))}

                <Button type="submit" variant="contained">Update Spot</Button>
            </form>
        </>
    );
}

export default UpdateSpot;
