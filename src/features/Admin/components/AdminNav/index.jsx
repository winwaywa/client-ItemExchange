import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../../../../../images/icon-svg/dashboard-icon.svg';
import UserIcon from '../../../../../images/icon-svg/user-icon.svg';
import PostIcon from '../../../../../images/icon-svg/post-icon.svg';
import LogoutIcon from '../../../../../images/icon-svg/logout-icon.svg';
import CategoryIcon from '../../../../../images/icon-svg/categories-icon.svg';

AdminNav.propTypes = {};

function AdminNav({ handleLogout }) {
    return (
        <ul className="nav__list">
            <li className="nav__item">
                <NavLink className="nav__link" to="dashboard">
                    <img className="nav__icon" src={DashboardIcon} alt="user-icon" />
                    <p>Bảng điều kiển</p>
                </NavLink>
            </li>
            <li className="nav__item">
                <NavLink className="nav__link" to="user">
                    <img className="nav__icon" src={UserIcon} alt="user-icon" />
                    <p>Thành viên</p>
                </NavLink>
            </li>
            <li className="nav__item">
                <NavLink className="nav__link" to="post">
                    <img className="nav__icon" src={PostIcon} alt="post-icon" />
                    <p>Bài đăng</p>
                </NavLink>
            </li>
            <li className="nav__item">
                <NavLink className="nav__link" to="category">
                    <img className="nav__icon" src={CategoryIcon} alt="post-icon" />
                    <p>Loại đồ</p>
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

export default AdminNav;
