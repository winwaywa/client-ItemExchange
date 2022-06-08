import './styles.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../../utils';
import { formatTime } from '../../../../utils';
import DOMPurify from 'dompurify';

ProductInfomation.propTypes = {};

function ProductInfomation({ product, user, categoryName }) {
    // sanitize html trước để cho an toàn tránh lỗi XSS
    const safeDescription = DOMPurify.sanitize(product.describe);
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
                <Link to={`/${user.username}`}>{user.username}</Link>
            </p>
            <p>
                Địa chỉ: {user.address} - {user.province}
            </p>
            {/* thuộc tính dangerouslySetInnerHTML của React */}
            <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
            <p style={{ fontStyle: 'italic' }}>Cập nhật: {formatTime(product.updatedAt)}</p>
        </div>
    );
}

export default ProductInfomation;
