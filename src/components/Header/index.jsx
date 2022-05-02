import './styles.scss';
import ProductIcon from '../../../images/icon-svg/product-icon.svg';
import UserIcon from '../../../images/icon-svg/user-icon.svg';
import LoginIcon from '../../../images/icon-svg/login-icon.svg';

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
Header.propTypes = {};

function Header(props) {
  const loggedUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedUser;

  return (
    <header className="header">
      <img className="header__logo" src="../../../images/logo.png" alt="logo" />
      {/* <div className="header__logo"></div> */}
      <nav>
        <ul className="header__list">
          <li className="header__item">
            <NavLink className="header__link" to="products">
              <img className="header__icon" src={ProductIcon} alt="product-icon" />
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li className="header__item">
              <NavLink className="header__link" to="login">
                <img className="header__icon" src={LoginIcon} alt="login-icon" />
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li className="header__item">
              <NavLink className="header__link header__user" to={'user/me'}>
                <img className="header__icon" src={UserIcon} alt="user-icon" />
                <span className="header__username">{loggedUser.username}</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
