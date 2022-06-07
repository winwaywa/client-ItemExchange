import './styles.scss';
import React, { useEffect, useState } from 'react';
import categoryApi from '../../../../api/categoryApi';
import DeleteIcon from '../../../../../images/icon-svg/delete-icon.svg';
import EditIcon from '../../../../../images/icon-svg/edit-icon.svg';
import PropTypes from 'prop-types';

CategoryPage.propTypes = {};

function CategoryPage(props) {
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState('');
    useEffect(() => {
        (async () => {
            const { categories } = await categoryApi.getAllCategory();
            setCategoryList(categories);
        })();
    }, []);

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        const { category: data } = await categoryApi.createCategory({ category_name: category });
        setCategoryList((preValue) => [...preValue, data]);
        setCategory('');
    };

    const handleDeleteCategory = async (id) => {
        const { category } = await categoryApi.deleteCategory(id);
        setCategoryList((preValue) => [...preValue.filter((x) => x._id !== id)]);
    };

    return (
        <div className="category">
            <form onSubmit={(e) => handleCreateCategory(e)} className="category__form">
                <input
                    value={category}
                    className="input--text"
                    type="text"
                    placeholder="Nhập loại đồ ..."
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button className="btn btn--small btn--primary">Thêm</button>
            </form>
            <table className="category__table">
                <tr>
                    <th>Loại</th>
                    <th>Thao tác</th>
                </tr>
                {categoryList.map((category) => (
                    <tr key={category._id}>
                        <td>{category.category_name}</td>
                        <td>
                            <img className="svg-icon" src={EditIcon} />
                            &nbsp; &nbsp;
                            <img
                                className="svg-icon"
                                src={DeleteIcon}
                                onClick={() => {
                                    handleDeleteCategory(category._id);
                                }}
                            />
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default CategoryPage;
