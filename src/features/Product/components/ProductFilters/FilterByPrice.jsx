import { useState } from 'react';
import PropTypes from 'prop-types';
FilterByPrice.propTypes = {};

function FilterByPrice({ onChange }) {
    const [values, setValues] = useState({
        price_gte: 0,
        price_lte: 0,
    });

    const handleChange = (e) => {
        setValues((preValues) => ({ ...preValues, [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e, values) => {
        e.preventDefault();
        if (onChange) onChange(values);
        setValues({ price_gte: 0, price_lte: 0 });
    };

    return (
        <div className="filter__price">
            <h3>Giá</h3>
            <form onSubmit={(e) => handleSubmit(e, values)}>
                <div className="filter__group">
                    <label htmlFor="price_gte">Từ</label>
                    <input
                        className="filter__input"
                        type="number"
                        name="price_gte"
                        id="price_gte"
                        placeholder="vnd"
                        value={values.price_gte}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="filter__group">
                    <label htmlFor="price_lte">Đến</label>
                    <input
                        className="filter__input"
                        type="number"
                        name="price_lte"
                        id="price_lte"
                        placeholder="vnd"
                        value={values.price_lte}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="filter__group">
                    <button className="btn btn--small filter__btn">Áp dụng</button>
                </div>
            </form>
        </div>
    );
}

export default FilterByPrice;
