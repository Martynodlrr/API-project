import * as sessionActions from '../../redux/session';
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';

import OpenModalMenuItem from './OpenModalMenuItem.js';
import LoginFormModal from '../LoginFormModal/index.js';
import SignupFormModal from '../SignupFormPage/SignupFormModal.js';
import CreateSpot from '../Spots/CreateSpot.js';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        setShowMenu(true);
    };

    useEffect(() => {
        const closeMenu = (event) => {
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

    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.resetUser());
        setShowMenu(false);
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
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
                            <OpenModalMenuItem
                                itemText="Create a Spot"
                                modalComponent={<CreateSpot />}
                            />
                            <li>
                                <div className='lineBreak'></div>
                            </li>
                            <li>
                                <button onClick={logout}><NavLink exact to="/">Log Out</NavLink></button>
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
