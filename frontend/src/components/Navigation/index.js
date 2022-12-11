// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const logoIcon = true

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
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
