import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

//mui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import productApi from '../../../api/productApi';
import transactionApi from '../../../api/transactionApi';

import TransactionSearch from '../components/TransactionSearch';
import TransactionTable from '../components/TransactionTable';

TransactionPage.propTypes = {};

function TransactionPage(props) {
    const [tabIndex, setTabIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        (async () => {
            var status_product = '';
            var status_transaction = '';
            switch (tabIndex) {
                case 0:
                    status_product = 'exchanging';
                    status_transaction = 'approved';
                    break;
                case 1:
                    status_product = 'exchanged';
                    status_transaction = 'completed';
                    break;
                default:
                    return;
            }
            try {
                const products = await productApi.getAllProducts({
                    status: status_product,
                    _sort: 'createdAt:DESC',
                });
                const transactions = await transactionApi.getTransactionsWithCondition({
                    status: status_transaction,
                });
                setTransactions(transactions.transactions);
                setProducts(products.products);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [tabIndex]);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <div className="post">
            <Box sx={{ width: '90%', margin: '0 auto' }}>
                <TransactionSearch />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}
                >
                    <Tabs value={tabIndex} onChange={handleChange}>
                        <Tab label="Đang trao đổi" value={0} />
                        <Tab label="Hoàn thành" value={1} />
                    </Tabs>
                </Box>
                <div>
                    <TransactionTable
                        tabIndex={tabIndex}
                        transactions={transactions}
                        productsFilter={products}
                    />
                </div>
            </Box>
        </div>
    );
}

export default TransactionPage;
