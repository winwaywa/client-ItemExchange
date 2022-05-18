import './styles.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../../utils';

ProductInfomation.propTypes = {};

function ProductInfomation({ product, user, categoryName }) {
    return (
        <div className="details__infomation">
            <h2>{product.product_name}</h2>
            <p>Giá:{formatPrice(product.price)}</p>
            <p>Độ mới: {product.percent_new}%</p>
            <p>Mô tả: {product.describe} </p>
            <p>Loại: {categoryName}</p>
            <p className="user">
                Người đăng:&nbsp;
                <img className="user__avatar" src={user.avatar} alt={user.username} />
                <Link to="" style={{ fontStyle: 'italic', fontWeight: 400 }}>
                    {user.username}
                </Link>
            </p>
            <p>
                Địa chỉ: {user.address} - {user.province}
            </p>
            <p>Cập nhật lần cuối vào {product.updatedAt}</p>
        </div>
    );
}

export default ProductInfomation;
