import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextareaAutosize, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import ReactGA from 'react-ga';

import InputFileUpload from '../InputFileUpload/InputFileUpload.js';
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

    const handleDescriptionChange = (e) => {
        const value = e.target.value;

        if (value.length <= 300 || (value.length < description.length)) {
            setDescription(value);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!address) newErrors.address = "Address is required";
        if (!city) newErrors.city = "City is required";
        if (!state) newErrors.state = "State is required";
        if (!country) newErrors.country = "Country is required";
        if (!description) newErrors.description = "Description needs a minimum of 30 characters";
        if (!price) newErrors.price = "Price is required";
        if (!images[0] || !images[0].url) newErrors.previewImg = "Preview Image is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        ReactGA.event({
            category: 'Spot',
            action: 'Created a Spot'
        });

        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const imagePayload = images.map(img => {
            if (img && img.file) return {  file: img.file };
        });

        const detailsPayload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        };

        dispatch(sessionActions.createSpot(detailsPayload))
            .then(res => {
                if (res.errors) {
                    for (const error of res.errors) {
                        setErrors(prevErrors => {
                            if (error.startsWith('Name must be between 1 and 50')) {
                                return { ...prevErrors, nameLen: 'Name must be between 1 and 50 charaters long.' };
                            }
                            if (error.startsWith('address must be unique')) {
                                return { ...prevErrors, uniqueAddress: 'address must be unique' };
                            }
                            if (description && description.length < 30) {
                                return { ...prevErrors, description: 'Description needs 30 or more characters' };
                            }
                            return prevErrors;
                        });
                    }
                } else {
                    if (res.ok) {
                        const { id } = res;

                        dispatch(sessionActions.addImagesToSpot({
                            imageFiles: imagePayload,
                            spotId: id
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
        if (isSubmitted) {
            const newErrors = validateForm();
            setErrors(newErrors);
        }
    }, [isSubmitted, address, city, state, country, lat, lng, name, description, price, previewImg]);

    const updatePreviewImage = e => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const updatedImage = { file, url };
            setImages([updatedImage, ...images.slice(1)]);
        }
    };

    const updateImageArray = (index) => (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const updatedImage = { file, url };
            const newImages = [...images];
            newImages[index + 1] = updatedImage;
            setImages(newImages);
        }
    };

    return (
        <>
            <h1 className='heading'>Create a New Spot</h1>
            <form onSubmit={handleSubmit} id='form-container'>
                <h2 className='heading'>Where's your place located?</h2>
                <p className='heading'>Guests will only get your exact address once they book a reservation.</p>

                <div id='input-container'>
                    <TextField
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        label="Street Address"
                        variant="standard"
                        required
                    />
                </div>
                {errors.address && <p className='error'>{errors.address}</p>}

                <div id='input-container'>
                    <TextField
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        label="City"
                        variant="standard"
                        required
                    />
                </div>
                {errors.city && <p className='error'>{errors.city}</p>}

                <div id='input-container'>
                    <TextField
                        value={state}
                        onChange={e => setState(e.target.value)}
                        label="State"
                        variant="standard"
                        required
                    />
                </div>
                {errors.state && <p className='error'>{errors.state}</p>}

                <div id='input-container'>
                    <TextField
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        label="Country"
                        variant="standard"
                        required
                    />
                </div>
                {errors.country && <p className='error'>{errors.country}</p>}

                <h2 className='heading'>Describe your place to guest</h2>
                <p className='heading'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>

                <div id='input-container'>
                    <TextareaAutosize
                        minRows={3}
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                        style={{ minWidth: "450px", minHeight: "75px", maxWidth: "500px", maxHeight: "150px" }}
                        placeholder="Please write at least 30 characters, up to 300."
                    />
                </div>

                {errors.description && <p className='error'>{errors.description}</p>}

                <h2 className='heading'>Create a title for your Spot</h2>
                <p className='heading'>Catch guests' attention with a spot title that highlights what makes your place special.</p>

                <div id='input-container'>
                    <TextField
                        value={name}
                        onChange={e => setName(e.target.value)}
                        label="Name of your Spot"
                        variant="standard"
                        required
                    />
                </div>
                {errors.name && <p className='error'>{errors.name}</p>}

                <h2 className='heading'>Set a base price for your spot</h2>
                <p className='heading'>Competitive pricing can help your listing stand out and rank higher in search results.</p>

                <div id='input-container'>
                    <TextField
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        label="Price (USD)"
                        variant="standard"
                        required
                        placeholder="Per Night"
                        inputProps={{
                            min: 1,
                            max: 9999999999.99,
                            step: "0.01"
                        }}
                    />
                </div>

                {errors.price && <p className='error'>{errors.price}</p>}

                <h2 className='heading'>Liven up your spot with photos</h2>
                <p className='heading'>Upload at least a preview image to publish your spot, extra are optional but encouraged.</p>

                <div id='image-container'>
                    {/* Preview Image section */}
                    <div className='image-input-container' style={{ marginBottom: '10px' }}>
                        {images[0] && <img className='image-previews' src={images[0].url} alt="Preview" style={{ maxWidth: '200px', marginBottom: '10px' }} />}
                        <InputFileUpload
                            label="Upload Preview Image"
                            startIcon={<CloudUploadIcon />}
                            onChange={updatePreviewImage}
                        />
                    </div>

                    {[0, 1, 2, 3].map((index) => (
                        <div className='image-input-container' key={index} style={{ marginBottom: '10px' }}>
                            {images[index + 1] && <img className='image-previews' src={images[index + 1].url} alt={`Image ${index + 1}`} style={{ maxWidth: '200px', marginBottom: '10px' }} />}
                            <InputFileUpload
                                label={`Image #${index + 1}`}
                                startIcon={<CloudUploadIcon />}
                                onChange={updateImageArray(index)}
                            />
                        </div>
                    ))}
                </div>

                <div id='action-container'>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Create Spot
                    </Button>
                </div>
            </form>
        </>
    );
};

export default CreateSpot;
