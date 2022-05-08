import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import PostItem from '../PostItem';

PostList.propTypes = {};

function PostList({ products, tabIndex }) {
    const [state, setState] = useState('');
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

    const productsFilter = useMemo(
        () => products.filter((product) => product.status === state),
        [state]
    );

    return (
        <>
            {productsFilter.length === 0 && <div>Chưa có</div>}
            <ul>
                {productsFilter.map((product) => (
                    <PostItem product={product} />
                ))}
            </ul>
        </>
    );
}

export default PostList;
