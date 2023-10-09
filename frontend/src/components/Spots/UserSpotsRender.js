import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

import { useModal } from '../Modal/context/Modal.js';
import ConfirmationDeleteModal from '../Modal/DeletionModal/ConfirmationDeleteModal.js';
import { renderAvgRating } from '../../HelperFuncs.js';
import * as spotActions from '../../redux/spots.js';

import './UserSpotRender.css';

function UserSpotsRender() {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const userSpotsObj = useSelector(state => state.spots.userSpots);
  const sessionUser = useSelector(state => state.session.user);

  const handleRedirect = spot => {
    history.push(`/spots/${spot.id}`);
  };

  const handleDelete = spotId => {
    setModalContent(<ConfirmationDeleteModal spotId={spotId} slice={'Spot'} theme={theme} />);
  };

  useEffect(() => {
    dispatch(spotActions.fetchUserSpots());
  }, [dispatch]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname)
  }, []);

  if (!sessionUser) history.push('/');

  return (
    <>
      <h1 className='heading'>Manage Spots</h1>
      <div id='create-button'>
        <IconButton href='/spots/new'>
          <AddIcon />
          Create a Spot
        </IconButton>
      </div>
      <div id='spots-container'>
        {Object.values(userSpotsObj).map(spot => (
          <div key={spot.id} className='spots-grid'>
            <div
              className='spot'
              title={spot.name}
              onClick={() => handleRedirect(spot)}
            >
              {spot.SpotImages && spot.SpotImages.length > 0 && (
                <img src={spot.SpotImages[0].url} alt={spot.name} />
              )}
              <div className='spot-content'>
                <div className='spot-info'>
                  <h2>{spot.city}, {spot.state}</h2>
                  {spot.Reviews && spot.Reviews.length > 0 ? (
                    <p>
                      <span className="star">&#9733; </span>
                      {renderAvgRating(
                        spot.Reviews.reduce((total, review) => total + review.stars, 0) / spot.Reviews.length
                      )}
                    </p>
                  ) : (
                    <p>
                      <span className="star">&#9733; </span>
                      New
                    </p>
                  )}
                </div>
                <p className='price'>${spot.price} night</p>
              </div>
            </div>
            <div className='manageButtons'>
              <Button className='updateButton' variant="contained" href={`/spots/${spot.id}/edit`} >Update</Button>
              <Button className='deleteButton' variant="outlined" onClick={() => handleDelete(spot.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserSpotsRender;
