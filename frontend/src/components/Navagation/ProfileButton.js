import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';

import * as sessionActions from '../../redux/session';
import OpenModalMenuItem from './OpenModalMenuItem.js';
import LoginFormModal from '../LoginFormModal/index.js';
import SignupFormModal from '../SignupFormPage/SignupFormModal.js';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();


    const openMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.resetUser());
        closeMenu();
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return showMenu ? (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>{user.username}</li>
                        <li>{user.firstName} {user.lastName}</li>
                        <li>{user.email}</li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
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
        </>
    ) : <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
    </button>
};

export default ProfileButton;
