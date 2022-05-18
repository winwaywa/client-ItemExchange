import PropTypes from 'prop-types';
import ProductItem from '../ProductItem';

ProductList.propTypes = {};

function ProductList({ products }) {
    return (
        <div className="product__list">
            {products.map((product) => (
                <div className="product__item" key={product._id}>
                    <ProductItem product={product} />
                </div>
            ))}
        </div>
    );
}

export default ProductList;
