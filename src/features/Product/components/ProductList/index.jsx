import './styles.scss';
import PropTypes from 'prop-types';
import ProductItem from '../ProductItem';

ProductList.propTypes = {};

function ProductList({ products }) {
    return (
        <div className="products__list">
            {products.map((product) => (
                <div className="products__item" key={product._id}>
                    <ProductItem product={product} />
                </div>
            ))}
        </div>
    );
}

export default ProductList;
