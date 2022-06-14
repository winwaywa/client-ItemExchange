import './styles.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../../../../images/icon-svg/search-icon.svg';
PostSearch.propTypes = {};

function PostSearch() {
    return (
        <div className="post__search">
            <form>
                <input type="text" placeholder="Tìm kiếm bài viết ..." />
                <button className="btn-search">
                    <img src={searchIcon} alt="search-icon" />
                </button>
            </form>
        </div>
    );
}

export default PostSearch;
