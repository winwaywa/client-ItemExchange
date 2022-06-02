import './styles.scss';
import HomeIcon from '../../../images/icon-svg/home-icon.svg';
import LoginIcon from '../../../images/icon-svg/login-icon.svg';
import MessageOutlineIcon from '../../../images/icon-svg/message-outline-icon.svg';
import NotificationIcon from '../../../images/icon-svg/notification-icon.svg';
import Logo from '../../../images/logo.png';

import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Notification from '../Notification';

Header.propTypes = {};

function Header(props) {
    const loggedUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loggedUser;
    const countNotification = useSelector((state) => state.user.notification);

    return (
        <header className="header">
            <Link to="/">
                <img src={Logo} className="header__logo" />
            </Link>
            <nav className="header__nav">
                <NavLink className="header__link" to="products">
                    <img className="header__icon" src={HomeIcon} alt="product-icon" />
                </NavLink>
                {isLoggedIn && (
                    <div className="header__notification">
                        <a href="" className="header__link" onClick={(e) => e.preventDefault()}>
                            <img
                                className="header__icon"
                                src={NotificationIcon}
                                alt="notification-icon"
                            />
                            {countNotification > 0 && (
                                <span className="header__count">{countNotification}</span>
                            )}
                        </a>
                        <Notification />
                    </div>
                )}
                {isLoggedIn && (
                    <NavLink className="header__link" to="message">
                        <img className="header__icon" src={MessageOutlineIcon} alt="message-icon" />
                    </NavLink>
                )}
                {isLoggedIn && (
                    <NavLink className="header__link--avatar" to={loggedUser.username}>
                        <img className="header__avatar" src={loggedUser.avatar} alt="avatar" />
                    </NavLink>
                )}
                {!isLoggedIn && (
                    <NavLink className="header__link" to="login">
                        <img className="header__icon" src={LoginIcon} alt="login-icon" />
                    </NavLink>
                )}
            </nav>
        </header>
    );
}

export default Header;
