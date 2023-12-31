import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { renderAvgRating } from '../../HelperFuncs.js';
import * as spotActions from '../../redux/spots';

import './SpotsRender.css';

function SpotsRender() {
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  const allSpotsObj = useSelector((state) => state.spots.allSpots);
  const spotsPerPage = 8;
  const startIndex = (currentPage - 1) * spotsPerPage;
  const allSpots = Object.values(allSpotsObj).slice(
    startIndex,
    startIndex + spotsPerPage
  );
  const totalPages = Math.ceil(Object.keys(allSpotsObj).length / spotsPerPage);

  const dispatch = useDispatch();

  const handleRedirect = (spot) => {
    history.push(`/spots/${spot.id}`);
  };

  useEffect(() => {
    dispatch(spotActions.loadSpots());
    dispatch(spotActions.fetchUserSpots());
  }, [dispatch]);

  return (
    <div className='spots-container'>
      <div className='spots-grid'>
        {allSpots.map((spot) => (
          <div
            key={spot.id}
            className='spot'
            title={spot.name}
            onClick={() => handleRedirect(spot)}
          >
            <img src={spot.previewImage} alt={spot.name} />
            <div className='spot-content'>
              <div className='spot-info'>
                <h2>{spot.city}, {spot.state}</h2>
                {spot.avgRating ? (
                  <p>
                    <span className="star">&#9733; </span>
                    {renderAvgRating(spot.avgRating)}
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
        ))}
      </div>

      <div className='pagination'>
        <IconButton disabled={currentPage === 1}>
          <ArrowBackIcon
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          >
            Previous Page
          </ArrowBackIcon>
        </IconButton>
        <IconButton disabled={currentPage === totalPages}>
          <ArrowForwardIcon
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          >
            Next Page
          </ArrowForwardIcon>
        </IconButton>
      </div>
    </div>
  );
};

export default SpotsRender;
