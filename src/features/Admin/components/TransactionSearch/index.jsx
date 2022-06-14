import './styles.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../../../../images/icon-svg/search-icon.svg';
TransactionSearch.propTypes = {};

function TransactionSearch() {
    return (
        <div className="post__search">
            <form>
                <input type="text" placeholder="Tìm kiếm giao dịch ..." />
                <button className="btn-search">
                    <img src={searchIcon} alt="search-icon" />
                </button>
            </form>
        </div>
    );
}

export default TransactionSearch;
