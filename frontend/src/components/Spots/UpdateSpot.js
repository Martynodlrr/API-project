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

    const handleDescriptionChange = (e) => {
        const value = e.target.value;

        if (value.length <= 300 || (value.length < description.length)) {
            setDescription(value);
        }
    };

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
        if (file) {
            const url = URL.createObjectURL(file);
            const updatedImage = images[0]?.id ? { id: images[0].id, file, url } : { file, url };
            setImages([updatedImage, ...images.slice(1)]);
        }
    };

    const updateImageArray = (index) => (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const updatedImage = images[index + 1]?.id ? { id: images[index + 1].id, file, url } : { file, url };
            const newImages = [...images];
            newImages[index + 1] = updatedImage;
            setImages(newImages);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Validate form
        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        // First, update spot details
        const detailsPayload = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            spotId
        };

        // Generating the desired image payload format
        const imagePayload = images.map(img => {
            if (img && img.file) return { id: img.id, file: img.file };
            return img && { id: img.id, url: img.url };
        });

        // Combining the two payloads
        detailsPayload.images = imagePayload;

        // Dispatch the thunk
        dispatch(spotActions.addSpotImages(detailsPayload))
            .then(addImageRes => {
                // Assuming there's some error field or similar in addImageRes to check
                if (addImageRes.errors) {
                    console.error("Error adding spot images:", addImageRes.errors);
                    return; // Stop the flow if there was an error adding images
                }

                return dispatch(spotActions.fetchUpdateSpot(detailsPayload));
            })
            .then(updateRes => {
                if (updateRes && updateRes.errors) {
                    updateRes.errors.forEach(error => {
                        setErrors(prevErrors => {
                            if (error.startsWith('Name')) {
                                return { ...prevErrors, nameLen: 'Name must be between 1 and 50 characters long.' };
                            }
                            if (error.startsWith('address')) {
                                return { ...prevErrors, uniqueAddress: 'Address must be unique' };
                            }
                            if (description && description.length < 30) {
                                return { ...prevErrors, description: 'Description' };
                            }
                            return prevErrors;
                        });
                    });
                } else if (updateRes) {
                    // Ensure 'spot' is defined in the outer scope
                    const { id } = spot;
                    closeModal();
                    history.push(`/spots/${id}`);
                }
            })
            .catch(error => {
                console.error("Error updating the spot:", error);
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
            <h1 className='heading'>Update Spot</h1>
            <form onSubmit={handleSubmit} id='form-container'>

                {/* Location Section */}
                <h2 className='heading'>Where's your place located?</h2>
                <p className='heading'>Guests will only get your exact address once they book a reservation.</p>

                <div id='input-container'>
                    <TextField value={address} onChange={e => setAddress(e.target.value)} label="Street Address" variant="standard" required />
                </div>

                {errors.address && <p className='error'>{errors.address}</p>}

                <div id='input-container'>
                    <TextField value={city} onChange={e => setCity(e.target.value)} label="City" variant="standard" required />
                </div>

                {errors.city && <p className='error'>{errors.city}</p>}

                <div id='input-container'>
                    <TextField value={state} onChange={e => setState(e.target.value)} label="State" variant="standard" required />
                </div>

                {errors.state && <p className='error'>{errors.state}</p>}

                <div id='input-container'>
                    <TextField value={country} onChange={e => setCountry(e.target.value)} label="Country" variant="standard" required />
                </div>

                {errors.country && <p className='error'>{errors.country}</p>}

                {/* Description Section */}
                <h2 className='heading'>Describe your place to guest</h2>
                <p className='heading'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>

                <div id='input-container'>
                    <TextareaAutosize
                        minRows={3}
                        value={description}
                        onChange={handleDescriptionChange}
                        required style={{ minWidth: '450px', minHeight: "75px", maxWidth: "500px", maxHeight: "150px" }} placeholder="Please write at least 30 characters, up to 300." />
                </div>

                {errors.description && <p className='error'>{errors.description}</p>}

                {/* Title Section */}
                <h2 className='heading'>Create a title for your Spot</h2>
                <p className='heading'>Catch guests' attention with a spot title that highlights what makes your place special.</p>

                <div id='input-container'>
                    <TextField value={name} onChange={e => setName(e.target.value)} label="Name of your Spot" variant="standard" required />
                </div>

                {errors.name && <p className='error'>{errors.name}</p>}

                {/* Price Section */}
                <h2 className='heading'>Set a base price for your spot</h2>
                <p className='heading'>Competitive pricing can help your listing stand out and rank higher in search results.</p>

                <div id='input-container'>
                    <TextField type="number" value={price} onChange={e => setPrice(e.target.value)} label="Price (USD)" variant="standard" required placeholder="Per Night" inputProps={{ min: 1, max: 9999999999.99, step: "0.01" }} />
                </div>

                {errors.price && <p className='error'>{errors.price}</p>}

                {/* Photo Upload Section */}
                <h2 className='heading'>Liven up your spot with photos</h2>
                <p className='heading'>Upload new or update existing photos.</p>

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

                    {errors.previewImg && <p className='error' style={{ marginBottom: '10px' }}>{errors.previewImg}</p>}

                    {/* Additional Images */}
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
                    <Button type="submit" variant="contained">Update Spot</Button>
                </div>
            </form>
        </>
    );
};

export default UpdateSpot;
