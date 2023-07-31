import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpots } from '../../redux/spots';

function SpotsRender() {
    const allSpots = useSelector(state => state.spots.allSpots);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(loadSpots());
    }, [dispatch]);

  return (
      <div className='spots'>

    </div>
  );
};

export default SpotsRender;
