import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import userApi from '../../../../api/userApi';
import categoryApi from '../../../../api/categoryApi';
import { formatPrice } from '../../../../utils';

ProductInfomation.propTypes = {};

function ProductInfomation({ product }) {
    const [user, setUser] = useState('');
    const [categoryName, setCategoryName] = useState('');
    console.log('a', product);
    useEffect(() => {
        (async () => {
            const user = await userApi.getUserById(product.createdBy);
            setUser(user.user.username);
            const category = await categoryApi.getCategory(product.category_id);
            setCategoryName(category.category.category_name);
        })();
    });
    return (
        <div className="products__infomation">
            <h2>{product.product_name}</h2>
            <p>Giá:{formatPrice(product.price)}</p>
            <p>Loại: {categoryName}</p>
            <p>{product.describe} </p>
            <p>
                Người đăng:&nbsp;
                <Link to="" style={{ fontStyle: 'italic', fontWeight: 400 }}>
                    {user}
                </Link>
            </p>
            <p>Cập nhật lần cuối vào {product.updatedAt}</p>
        </div>
    );
}

export default ProductInfomation;
