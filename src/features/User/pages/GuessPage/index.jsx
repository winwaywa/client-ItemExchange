import './styles.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GuessPost from '../../components/GuessPost';
import GuessAbout from '../../components/GuessAbout';

import productApi from '../../../../api/productApi';
import transactionApi from '../../../../api/transactionApi';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

GuessPage.propTypes = {};

function GuessPage({ user, me }) {
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isExchanging, setIsExchanging] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const products = await productApi.getAllProducts({
                status: 'enable',
                username: user.username,
                _sort: 'createdAt:DESC',
            });
            setProductList(products.products);

            const { transactions } = await transactionApi.getTransactionsWithCondition({
                status: 'approved',
            });
            const isTransaction = transactions.filter(
                (transaction) =>
                    (transaction.request_recipient === user.username ||
                        transaction.request_sender === user.username) &&
                    (transaction.request_recipient === me.username ||
                        transaction.request_sender === me.username)
            );
            console.log('Dang co giao dich:', isTransaction);
            setIsExchanging(isTransaction.length === 0 ? false : true);

            setIsLoading(false);
        })();
    }, []);

    return (
        <div className="user__guess guess">
            {isExchanging && <GuessAbout user={user} />}
            {!isLoading ? (
                <GuessPost productList={productList} />
            ) : (
                <Box sx={{ width: '100%', marginTop: '1rem', textAlign: 'center' }}>
                    <CircularProgress />
                </Box>
            )}
        </div>
    );
}

export default GuessPage;
