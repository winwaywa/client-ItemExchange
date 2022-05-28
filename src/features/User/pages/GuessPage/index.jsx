import './styles.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GuessPost from '../../components/GuessPost';
import GuessAbout from '../../components/GuessAbout';

import productApi from '../../../../api/productApi';

GuessPage.propTypes = {};

function GuessPage({ user }) {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        (async () => {
            const products = await productApi.getAllProducts({
                username: user.username,
                _sort: 'createdAt:DESC',
            });
            setProductList(products.products);
        })();
    }, []);

    return (
        <div className="user__guess guess">
            <GuessAbout user={user} />
            <GuessPost productList={productList} />
        </div>
    );
}

export default GuessPage;
