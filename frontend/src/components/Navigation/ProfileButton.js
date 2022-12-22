import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const directToProfile = (e) => {
    e.preventDefault();
    // dispatch(sessionActions.logout());
    history.push("/user/current")
    closeMenu();
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push(`/`);
  };

  if (!user) return null;

  return (
    <div ref={ulRef}>
      <h6 className="title is-6">{user.username}</h6>
      <h6 className="title is-6">{user.firstName} {user.lastName}</h6>
      <h6 className="title is-6">{user.email}</h6>
      <div className="buttons mt-5">
        <button className="button is-primary" onClick={directToProfile}>Profile</button>
        <button className='button is-light logout-button' onClick={logout}>Log Out</button>
      </div>
    </div>
  );
}

export default ProfileButton;
