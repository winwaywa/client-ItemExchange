import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CategoryApi from '../../../../api/categoryApi';
FilterByCategory.propTypes = {};

function FilterByCategory({ onChange }) {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const categories = await CategoryApi.getAllCategory();
                setCategoryList(categories.categories);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleCategoryClick = (category_id) => {
        if (onChange) onChange({ category_id });
    };

    return (
        <div className="filter__category category">
            <h3 className="heading-tertiary">Loại đồ</h3>
            <ul className="category__list">
                {categoryList.map((category) => (
                    <li
                        key={category._id}
                        className="category__item"
                        onClick={() => handleCategoryClick(category._id)}
                    >
                        <p>{category.category_name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FilterByCategory;
