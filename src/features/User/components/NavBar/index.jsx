import './styles.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
NavBar.propTypes = {};

function NavBar({ user, handleLogout }) {
    return (
        <div className="navbar">
            <div>
                <NavLink to="" end>
                    Bài viết
                </NavLink>
                <NavLink to="requests">Yêu cầu</NavLink>
                <NavLink to="transactions">Giao dịch</NavLink>
                <NavLink to="about">Giới thiệu</NavLink>
                {user.role === 'admin' && <NavLink to="/admin">Trang Admin</NavLink>}
            </div>
            <div>
                <a href="#" onClick={handleLogout}>
                    Đăng xuất
                </a>
            </div>
        </div>
    );
}

export default NavBar;
