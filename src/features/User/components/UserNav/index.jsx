import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import UserIcon from '../../../../../images/icon-svg/user-icon.svg';
import PostIcon from '../../../../../images/icon-svg/post-icon.svg';
import LogoutIcon from '../../../../../images/icon-svg/logout-icon.svg';
import ExchangeIcon from '../../../../../images/icon-svg/exchange-icon.svg';

UserNav.propTypes = {};

function UserNav({ handleLogout }) {
    return (
        <ul className="nav__list">
            <li className="nav__item">
                <NavLink className="nav__link" to="me">
                    <img className="nav__icon" src={UserIcon} alt="user-icon" />
                    <p>Thông tin cá nhân</p>
                </NavLink>
            </li>
            <li className="nav__item">
                <NavLink className="nav__link" to="post">
                    <img className="nav__icon" src={PostIcon} alt="post-icon" />
                    <p>Bài đăng</p>
                </NavLink>
            </li>
            <li className="nav__item">
                <NavLink className="nav__link" to="requests">
                    <img className="nav__icon" src={ExchangeIcon} alt="exchange-icon" />
                    <p>Yêu cầu</p>
                </NavLink>
            </li>
            <li className="nav__item">
                <a href="#" className="nav__link" onClick={(e) => handleLogout(e)}>
                    <img className="nav__icon" src={LogoutIcon} alt="logout-icon" />
                    <p>Đăng xuất</p>
                </a>
            </li>
        </ul>
    );
}

export default UserNav;
