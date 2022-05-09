import './styles.scss';
import ProductIcon from '../../../images/icon-svg/product-icon.svg';
import UserIcon from '../../../images/icon-svg/user-icon.svg';
import LoginIcon from '../../../images/icon-svg/login-icon.svg';
import Logo from '../../../images/logo.png';

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
Header.propTypes = {};

function Header(props) {
    const loggedUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loggedUser;

    return (
        <header className="header">
            <Link to="/">
                <img src={Logo} className="header__logo" />
            </Link>
            <nav className="header__nav">
                <NavLink className="header__link" to="products">
                    <img className="header__icon" src={ProductIcon} alt="product-icon" />
                </NavLink>
                {!isLoggedIn && (
                    <NavLink className="header__link" to="login">
                        <img className="header__icon" src={LoginIcon} alt="login-icon" />
                    </NavLink>
                )}
                {isLoggedIn && (
                    <NavLink className="header__link" to={'user/me'}>
                        <img
                            className="header__icon header__avatar"
                            src={loggedUser.avatar}
                            alt="avatar"
                        />
                        <span className="header__username">{loggedUser.username}</span>
                    </NavLink>
                )}
            </nav>
        </header>
    );
}

export default Header;
