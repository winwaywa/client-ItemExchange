import './styles.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../../../../images/icon-svg/search-icon.svg';
UserSearch.propTypes = {};

function UserSearch(props) {
    return (
        <div className="user__search">
            <form>
                <input type="text" placeholder="Tìm kiếm người dùng ..." />
                <button className="btn-search">
                    <img src={searchIcon} alt="search-icon" />
                </button>
            </form>
        </div>
    );
}

export default UserSearch;
