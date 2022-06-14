import './styles.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import ProductApi from '../../../../api/productApi';
import ProductImages from '../../components/ProductImages';
import ProductDetails from '../../components/ProductDetails';
import PropTypes from 'prop-types';
DetailsPage.propTypes = {};

function DetailsPage(props) {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(false);
                const data = await ProductApi.getProduct(id);
                setProduct(data.product);
                setIsLoading(true);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [id]);

    return (
        <>
            {!isLoading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}
            {isLoading && <ProductImages images_url={product.images_url} />}
            {isLoading && <ProductDetails product={product} />}
        </>
    );
}

export default DetailsPage;
