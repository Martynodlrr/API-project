import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useModal } from '../Modal/context/Modal.js';
import ConfirmationDeleteModal from '../Modal/DeletionModal/ConfirmationDeleteModal.js';
import { renderAvgRating } from '../../HelperFuncs.js';
import * as spotActions from '../../redux/spots.js';

import './SpotsRender.css';

function UserSpotsRender() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const userSpotsObj = useSelector(state => state.spots.userSpots);
  const sessionUser = useSelector(state => state.session.user);

  const handleRedirect = spot => {
    history.push(`/spots/${spot.id}`);
  };

  const handleDelete = spotId => {
    setModalContent(<ConfirmationDeleteModal spotId={spotId} slice={'Spot'} />);
  };

  useEffect(() => {
    dispatch(spotActions.fetchUserSpots());
  }, [dispatch]);

  if (!sessionUser) history.push('/');

  return (
    <>
      <h1>Manage Spots</h1>
      <button><NavLink to='/spots/new'>Create a Spot</NavLink></button>
      <div className='spots-grid'>
        {Object.values(userSpotsObj).map(spot => (
          <div key={spot.id} className='spots-container'>
            <div className='spots-grid'>
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
            </div>
            <div className='manageButtons'>
            <button className='updateButton' ><NavLink to={`/spots/${spot.id}/edit`}>Update</NavLink></button>
            <button className='deleteButton' onClick={() => handleDelete(spot.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserSpotsRender;
