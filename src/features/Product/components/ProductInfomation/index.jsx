import './styles.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../../utils';
import { formatTime } from '../../../../utils';
import moment from 'moment';

ProductInfomation.propTypes = {};

function ProductInfomation({ product, user, categoryName }) {
    return (
        <div className="details__infomation">
            <h2 className="heading-secondary">{product.product_name}</h2>
            <p>
                <strong>{formatPrice(product.price)}</strong>
            </p>
            <p>Độ mới: {product.percent_new}%</p>
            <p>Loại: {categoryName}</p>
            <p className="details__user">
                Người đăng:&nbsp;
                <img className="details__avatar" src={user.avatar} alt={user.username} />
                <Link to="">{user.username}</Link>
            </p>
            <p>
                Địa chỉ: {user.address} - {user.province}
            </p>
            <p>Mô tả: {product.describe} </p>
            <p>Cập nhật lần cuối vào {formatTime(product.updatedAt)}</p>
        </div>
    );
}

export default ProductInfomation;
