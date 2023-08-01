import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { loadSpots } from '../../redux/spots';

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

  const handleRedirect = (spot) => {
    history.push(`/spots/${spot.id}`);
  };

  const renderAvgRating = rating => {
    const strRating = rating.toString();
    return strRating.includes('.') ? strRating : `${rating}.0`;
  };

  useEffect(() => {
    dispatch(loadSpots());
  }, [dispatch]);

  return (
    <div className='spots'>
      {allSpots.map(spot => (
        <div key={spot.id} title={spot.name} onClick={() => handleRedirect(spot)}>
          <img src={spot.previewImage} alt={spot.name} />
          <h2>City: {spot.city}</h2>
          <h2>State: {spot.state}</h2>
          {spot.avgRating ? <p>Average stars: <span className="star">&#9733;</span>{renderAvgRating(spot.avgRating)}</p> : <p>New</p>}
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
