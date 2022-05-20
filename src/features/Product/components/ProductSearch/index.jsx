import './styles.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../../../../images/icon-svg/search-icon.svg';
ProductSearch.propTypes = {};

function ProductSearch({ onChange }) {
    const [keyWord, setKeyWord] = useState('');

    const handleSubmit = (e, keyWord) => {
        e.preventDefault();
        if (onChange) onChange(keyWord);
        setKeyWord('');
    };
    return (
        <div className="product__search">
            <form onSubmit={(e) => handleSubmit(e, keyWord)}>
                <input
                    value={keyWord}
                    type="text"
                    placeholder="Tìm kiếm tên sản phẩm ..."
                    onChange={(e) => setKeyWord(e.target.value)}
                />
                <button className="btn-search">
                    <img src={searchIcon} alt="search-icon" />
                </button>
            </form>
        </div>
    );
}

export default ProductSearch;
