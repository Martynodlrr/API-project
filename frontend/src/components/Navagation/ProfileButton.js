import { NavLink, useHistory, useLocation } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from "react";
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

import SignupFormModal from '../Modal/SessionModal/SignupFormPage/SignupFormModal.js';
import LoginFormModal from '../Modal/SessionModal/LoginFormPage/LoginFormModal.js';
import OpenModalMenuItem from '../Modal/OpenModalButton/OpenModalMenuItem.js';
import * as sessionActions from '../../redux/session';
import * as spotActions from '../../redux/spots.js';

import './Navigation.css';

function ProfileButton({ user }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const userSpotsObj = useSelector(state => state.spots.userSpots);
    const ulRef = useRef();

    const openMenu = () => {
        if (!showMenu) {
            setShowMenu(true);
        }
    };

    useEffect(() => {
        const closeMenu = event => {
            if (ulRef.current && !ulRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener('click', closeMenu);
        }

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    useEffect(() => {
    }, [userSpotsObj]);

    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.resetUser());
        dispatch(spotActions.thunkResetUserSpots());
        setShowMenu(false);
        history.push('/');
    };

    const ulClassName = `profile-dropdown${showMenu ? " show" : ""}`;

    return (
        <div className="profile-menu-wrapper">
            {user ? (
                <AccountCircleIcon className={`menu-icon${showMenu ? '-show' : ''}`} onClick={openMenu} color="secondary" />
            ) : (
                <MenuRoundedIcon className={`menu-icon${showMenu ? '-show' : ''}`} sx={{ fontSize: 25 }} onClick={openMenu} />
            )}
            {showMenu && (
                <ul className={ulClassName} ref={ulRef}>
                    {user ? (
                        <ul>
                            <li>Hello, {user.firstName}!</li>
                            <li>{user.email}</li>
                            <div className='lineBreak'></div>
                            <li>
                                <Button
                                    to='/spots/current'
                                    component={NavLink}
                                    variant="outlined"
                                    onClick={() => setShowMenu(false)}
                                >
                                    Manage Spots
                                </Button>
                            </li>
                            <div className='lineBreak'></div>
                            <li>
                                <Button onClick={logout} variant="contained">Log Out</Button>
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <OpenModalMenuItem
                                itemText="Log In"
                                modalComponent={<LoginFormModal theme={theme} />}
                                onItemClick={() => setShowMenu(false)}
                                styleName={'item'}
                                />
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                modalComponent={<SignupFormModal theme={theme} />}
                                onItemClick={() => setShowMenu(false)}
                                styleName={'item'}
                            />
                        </ul>
                    )}
                </ul>
            )}
        </div>
    );
};

export default ProfileButton;
