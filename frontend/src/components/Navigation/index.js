// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const logoIcon = true

  let isLoggedIn

  if(!sessionUser){
    isLoggedIn = false

  } else {
      isLoggedIn = true
  }
  

  return (
    <ul>
      <li>
        <NavLink className='logoName' exact to="/">
          {logoIcon && (
            <>
              <i className="fas fa-solid fa-tree"></i>
              <p>treebnb</p>
            </>
          )}
          {!logoIcon && (
            <i>treebnb</i>
          )}
        </NavLink>
      </li>

      <div className='right-side'>
        <p className='list-your-home-p' id='list-your-home'>
          { isLoggedIn && (
            <NavLink className='list-your-home' exact to="/spots/create">
              List your home
            </NavLink>
          ) }
        </p>

        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </ul>
  );
}

export default Navigation;
