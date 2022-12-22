// frontend/src/components/Navigation/index.js
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useModal } from '../../context/Modal';

import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const { setModalContent } = useModal();
  const platformTitle = 'treebnb';

  const logoIcon = true;
  const isLoggedIn = !!sessionUser;

  const handleOpenModal = (modalComponent) => () => {
    setModalContent(modalComponent);
  };

  const handleOpenMobileMenu = () => {
    document.querySelector('#navbarBurger').classList.toggle('is-active');
    document.querySelector('#navbarBasic').classList.toggle('is-active');
  };

  const handleOpenProfileMenu = () => {
    document.querySelector('#navbarProfile').classList.toggle('is-active');
  };

  return (
    <nav className="navbar is-flex-wrap-wrap" role="navigation" aria-label="main navigation">
      <div className={`navbar-brand is-justify-content-space-between ${isLoggedIn ? 'w-100' : ''} pb-4 pt-4`}>
        <NavLink className="navbar-item logo" exact to="/">
          {logoIcon && <i className="fas fa-solid fa-tree mr-2"></i>}
          <p>{platformTitle}</p>
        </NavLink>
        {!isLoggedIn ? (
          <a role="button" className="navbar-burger" id="navbarBurger" onClick={handleOpenMobileMenu}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        ) : (
          <div className="buttons pr-3 is-flex is-align-content-center">
            <NavLink className='button is-primary' exact to="/spots/create">
              List your home
            </NavLink>
            <button className='button is-rounded' onClick={handleOpenProfileMenu}>
              <i className="fas fa-solid fa-bars"></i>
              <i className="fas fa-user-circle ml-3" />
            </button>
          </div>
        )}
      </div>

      {!isLoggedIn ? ( 
        <div id="navbarBasic" className='navbar-menu'>
          <div className="navbar-end">
            <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-primary" onClick={handleOpenModal(<LoginFormModal />)}>
                    Log In
                  </a>
                  <a className="button is-light" onClick={handleOpenModal(<SignupFormModal />)}>
                    Sign Up
                  </a>
                </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="navbarProfile" className='navbar-profile-menu w-100 pl-3 pb-5 pt-5'>
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div>
      )}
    </nav>
  );
}

export default Navigation;
