import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton.js';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav'>
      <Link to="/">
        <img
          id='logo'
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
          style={{
            height: "50px",
            minHeight: "50px",
            minWidth: "160px",
          }}
        />
      </Link>
      < div className='meunButton'>
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </div>
    </div>
  );
};

export default Navigation;
