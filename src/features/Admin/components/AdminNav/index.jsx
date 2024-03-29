import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../../../../../images/icon-svg/dashboard-icon.svg';
import MembersIcon from '../../../../../images/icon-svg/members-icon.svg';
import PostIcon from '../../../../../images/icon-svg/post-icon.svg';
import CategoryIcon from '../../../../../images/icon-svg/categories-icon.svg';
import MenuIcon from '../../../../../images/icon-svg/menu-icon.svg';
import ExchangeIcon from '../../../../../images/icon-svg/exchange-icon.svg';
import DeliveryIcon from '../../../../../images/icon-svg/delivery-icon.svg';

AdminNav.propTypes = {};

function AdminNav({ handleLogout }) {
    return (
        <>
            <input type="checkbox" id="nav-toggle" name="nav-toggle" />
            <label id="nav-btn" htmlFor="nav-toggle">
                <img className="svg-icon" src={MenuIcon} alt="menu-icon" />
            </label>

            <nav className="nav">
                <ul className="nav__list">
                    <li className="nav__item">
                        <NavLink className="nav__link" to="" end>
                            <img className="nav__icon" src={DashboardIcon} alt="dashboard-icon" />
                            <p>Thống kê</p>
                        </NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink className="nav__link" to="user">
                            <img className="nav__icon" src={MembersIcon} alt="members-icon" />
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
                        <NavLink className="nav__link" to="transactions">
                            <img className="nav__icon" src={ExchangeIcon} alt="post-icon" />
                            <p>Giao dịch</p>
                        </NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink className="nav__link" to="delivery">
                            <img className="nav__icon" src={DeliveryIcon} alt="post-icon" />
                            <p>Vận chuyển</p>
                        </NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink className="nav__link" to="category">
                            <img className="nav__icon" src={CategoryIcon} alt="post-icon" />
                            <p>Loại đồ</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default AdminNav;
