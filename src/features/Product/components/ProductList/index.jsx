import ProductItem from '../ProductItem';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
ProductList.propTypes = {};

function ProductList({ products }) {
    return (
        <div className="product__list">
            {products.map((product) => (
                <Link className="product__item" to={`/products/${product._id}`} key={product._id}>
                    <ProductItem product={product} />
                </Link>
            ))}
        </div>
    );
}

export default ProductList;
