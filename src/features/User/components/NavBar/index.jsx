import './styles.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
NavBar.propTypes = {};

function NavBar({ handleLogout }) {
    return (
        <div className="navbar">
            <NavLink to="">Bài viết</NavLink>
            <NavLink to="about">Giới thiệu</NavLink>
            <NavLink to="requests">Yêu cầu</NavLink>
            <a href="#" onClick={handleLogout}>
                Đăng xuất
            </a>
        </div>
    );
}

export default NavBar;
