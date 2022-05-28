import React from 'react';
import PropTypes from 'prop-types';

GuessAbout.propTypes = {};

function GuessAbout({ user }) {
    return (
        <div className="guess__about">
            <h2 className="heading-secondary">Giới thiệu</h2>
            <ul>
                <li>
                    Địa chỉ {user.address}( {user.province} )
                </li>
                <li>Sdt: {user.phone}</li>
                <li>Email: {user.email}</li>
            </ul>
        </div>
    );
}

export default GuessAbout;
