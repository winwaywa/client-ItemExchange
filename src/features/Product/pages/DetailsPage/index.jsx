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
    }, []);
    return (
        <>
            <ProductImages />
            {product && <ProductDetails product={product} />}
        </>
    );
}

export default DetailsPage;
