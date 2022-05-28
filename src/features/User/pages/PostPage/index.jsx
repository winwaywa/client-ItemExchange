import './styles.scss';
import { useEffect, useState } from 'react';
import productApi from '../../../../api/productApi';
import { Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

import DeleteIcon from '../../../../../images/icon-svg/delete-icon.svg';
import EditIcon from '../../../../../images/icon-svg/edit-icon.svg';
import LookIcon from '../../../../../images/icon-svg/look-icon.svg';

import PropTypes from 'prop-types';
PostPage.propTypes = {};

function PostPage(props) {
    const [productList, setProductList] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        const status = tabIndex === 0 ? 'enable' : 'disable';
        (async () => {
            const products = await productApi.getProductsByUser({ status });
            setProductList(products.products);
        })();
    }, [tabIndex]);

    const handleChangeTab = (e, newTab) => {
        setTabIndex(newTab);
    };

    return (
        <div className="user__post">
            <Tabs value={tabIndex} onChange={handleChangeTab}>
                <Tab value={0} label="Đã được duyệt" />
                <Tab value={1} label="Chưa duyệt" />
            </Tabs>
            <ul className="post__list">
                {productList.map((product) => (
                    <li className="post__item" key={product._id}>
                        <img
                            className="post__img"
                            src={product.images_url.split(',')[0]}
                            alt={product.product_name}
                        />
                        <div className="post__action">
                            <Link to={`/products/${product._id}`}>
                                <img className="post__icon" src={LookIcon} alt="look-icon" />
                            </Link>
                            <img className="post__icon" src={EditIcon} alt="edit-icon" />
                            <img className="post__icon" src={DeleteIcon} alt="delete-icon" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostPage;
