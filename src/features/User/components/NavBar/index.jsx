import './styles.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import MoreIcon from '../../../../../images/icon-svg/more-icon.svg';
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
                <NavLink className="navbar__delivery" to="delivery">
                    Vận chuyển
                </NavLink>
                <NavLink className="navbar__about" to="about">
                    Giới thiệu
                </NavLink>
                {user.role === 'admin' && (
                    <NavLink className="navbar__admin" to="/admin">
                        Trang Admin
                    </NavLink>
                )}

                <a className="navbar__logout" href="#" onClick={handleLogout}>
                    Đăng xuất
                </a>
            </div>
            <div className="navbar__more">
                {/* <input type="checkbox" id="sub-toggle" />
                    <label className="sub-btn" htmlFor="sub-toggle">
                    <a>Xem thêm</a>
                </label> */}
                <img src={MoreIcon} alt="more-icon" />
                <div className="navbar__sub">
                    {user.role === 'admin' && <Link to="/admin">Trang Admin</Link>}
                    <Link to="delivery">Vận chuyển</Link>
                    <Link to="about">Giới thiệu</Link>
                    <a href="#" onClick={handleLogout}>
                        Đăng xuất
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
