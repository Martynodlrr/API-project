import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from "react";

import SignupFormModal from '../Modal/SessionModal/SignupFormPage/SignupFormModal.js';
import LoginFormModal from '../Modal/SessionModal/LoginFormPage/LoginFormModal.js';
import OpenModalMenuItem from '../Modal/OpenModalButton/OpenModalMenuItem.js';
import * as sessionActions from '../../redux/session';
import * as spotActions from '../../redux/spots.js';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const userSpotsObj = useSelector(state => state.spots.userSpots);
    const ulRef = useRef();

    const openMenu = () => {
        setShowMenu(true);
    };

    useEffect(() => {
        const closeMenu = event => {
            if (ulRef.current && ulRef.current.contains(event.target)) {
                return;
            }
            setShowMenu(false);
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

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            {
                location.pathname === "/spots/current" && (
                <NavLink to='/spots/new'>Create a Spot</NavLink>)
            }
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && (
                <ul className={ulClassName} ref={ulRef}>
                    {user ? (
                        <ul>
                            <li>Hello, {user.firstName}</li>
                            <li>{user.email}</li>
                            <li>
                                <div className='lineBreak'></div>
                            </li>
                            <li className='Links'>
                                <NavLink to='/spots/current' onClick={() => setShowMenu(false)}>Manage Spots</NavLink>
                            </li>
                            <li>
                                <div className='lineBreak'></div>
                            </li>
                            <li>
                                <button onClick={logout}>Log Out</button>
                            </li>
                        </ul>
                    ) : (
                        <>
                            <OpenModalMenuItem
                                itemText="Log In"
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                modalComponent={<SignupFormModal />}
                            />
                        </>
                    )}
                </ul>
            )}
        </>
    );
};

export default ProfileButton;
