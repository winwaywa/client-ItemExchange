import './styles.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';
import ProductApi from '../../../../api/productApi';
import ProductImages from '../../components/ProductImages';
import ProductDetails from '../../components/ProductDetails';
DetailsPage.propTypes = {};

function DetailsPage(props) {
    const { id } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        (async () => {
            const data = await ProductApi.getProduct(id);
            setProduct(data.product);
        })();
    }, [id]);

    return (
        <div className="product__details">
            {product && <ProductImages images_url={product.images_url} />}
            {product && <ProductDetails product={product} />}
        </div>
    );
}

export default DetailsPage;
