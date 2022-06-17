import React from 'react';
import PhoneFillIcon from '../../../../../images/icon-svg/phone-fill-icon.svg';
import EmailFillIcon from '../../../../../images/icon-svg/email-fill-icon.svg';
import MapFillIcon from '../../../../../images/icon-svg/map-fill-icon.svg';

import PropTypes from 'prop-types';
GuessAbout.propTypes = {};

function GuessAbout({ user }) {
    return (
        <div className="guess__about">
            <h2
                className="heading-tertiary"
                style={{ borderBottom: '1px solid rgb(220, 220, 220)' }}
            >
                Giới thiệu
            </h2>
            <ul className="about__list">
                <li className="about__item">
                    <img className="svg-icon" src={MapFillIcon} alt="map-icon" />
                    <span>
                        {user.address}( {user.province} )
                    </span>
                </li>
                <li className="about__item">
                    <img className="svg-icon" src={PhoneFillIcon} alt="phone-icon" />
                    <span>{user.phone || 'Trống'}</span>
                </li>
                <li className="about__item">
                    <img className="svg-icon" src={EmailFillIcon} alt="email-icon" />
                    <span>{user.email}</span>
                </li>
            </ul>
        </div>
    );
}

export default GuessAbout;
