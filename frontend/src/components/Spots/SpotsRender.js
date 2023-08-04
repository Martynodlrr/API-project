import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { renderAvgRating } from '../../HelperFuncs.js';
import * as spotActions from '../../redux/spots';

import './SpotsRender.css';

function SpotsRender() {
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  const allSpotsObj = useSelector(state => state.spots.allSpots);
  const spotsPerPage = 20;
  const startIndex = (currentPage - 1) * spotsPerPage;
  const allSpots = Object.values(allSpotsObj).slice(startIndex, startIndex + spotsPerPage);
  const totalPages = Math.ceil(Object.keys(allSpotsObj).length / spotsPerPage);

  const dispatch = useDispatch();

  const handleRedirect = spot => {
    history.push(`/spots/${spot.id}`);
  };

  useEffect(() => {
    dispatch(spotActions.loadSpots());
    dispatch(spotActions.fetchUserSpots());
  }, [dispatch]);

  return (
    <div className='spots'>
      {allSpots.map(spot => (
        <div key={spot.id} title={spot.name} onClick={() => handleRedirect(spot)}>
          <img src={spot.previewImage} alt={spot.name} />
          <h2>{spot.city}, {spot.state}</h2>
          {spot.avgRating ? <p>Average stars: <span className="star">&#9733; </span>{renderAvgRating(spot.avgRating)}</p> :
            <p>
              <span className="star">&#9733; </span>
              New
            </p>}
          <p>${spot.price} a night</p>
        </div>
      ))}

      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prevPage => prevPage - 1)}
        >
          Previous Page
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prevPage => prevPage + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default SpotsRender;
