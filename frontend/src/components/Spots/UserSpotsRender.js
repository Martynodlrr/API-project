import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import React, { useEffect } from 'react';

import ConfirmationDeleteModal from '../Modal/DeletionModal/ConfirmationDeleteModal.js';
import * as spotActions from '../../redux/spots.js';
import { useModal } from '../Modal/context/Modal.js';

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

  if (!sessionUser) history.push('/')

  return (Object.keys(userSpotsObj).length > 0 ?
    <>
      <h1>Manage Spots</h1>
      <NavLink to='/spots/new'>Create a Spot</NavLink>
      <div className='spots'>
        {Object.values(userSpotsObj).map(spot => (
          <React.Fragment key={spot.id}>
            <div title={spot.name} onClick={() => handleRedirect(spot)}>
              {spot.SpotImages.length && <img src={spot.SpotImages[0].url} alt={spot.name} />}
              <h2>{spot.city}, {spot.state}</h2>
              {spot.Reviews.length > 0 ? <p><span className="star">&#9733; </span>{spot.Reviews[0].avgStars}</p> :
                <p>
                  <span className="star">&#9733; </span>
                  New
                </p>}
              <p>${spot.price} a night</p>
            </div>
            <button>Update</button>
            <button onClick={() => handleDelete(spot.id)}>Delete</button>
          </React.Fragment>
        ))}
      </div>
    </> :
    <>
      <h1>Manage Spots</h1>
      <NavLink to='/spots/new'>Create a Spot</NavLink>
    </>
  )
};

export default UserSpotsRender;
