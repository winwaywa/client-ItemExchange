import React, { useEffect, useState, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import PostTable from '../PostTable';
import productApi from '../../../../api/productApi';
import PropTypes from 'prop-types';
PostList.propTypes = {};

function PostList({ products, tabIndex }) {
    const { enqueueSnackbar } = useSnackbar();
    const [state, setState] = useState('');

    const [productsFilter, setproductsFilter] = useState();

    useMemo(() => {
        setproductsFilter(products.filter((product) => product.status === state));
    }, [state]);

    useEffect(() => {
        switch (tabIndex) {
            case 0:
                setState('new');
                break;
            case 1:
                setState('requesting');
                break;
            case 2:
                setState('trading');
                break;
            case 3:
                setState('completed');
                break;
            default:
                return;
        }
    }, [tabIndex]);

    const handleClickDelete = async (id) => {
        try {
            const product = await productApi.deleteProduct(id);
            console.log(product);
            setproductsFilter(productsFilter.filter((product) => product._id !== id));
            enqueueSnackbar('Xoá sản phẩm thành công', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar('Xoá sản phẩm không thành công ', { variant: 'error' });
        }
    };

    return (
        <>
            {tabIndex === 0 && (
                <PostTable productsFilter={productsFilter} onDelete={handleClickDelete} />
            )}
        </>
    );
}

export default PostList;
