import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import RequestList from '../components/RequestList';
import transactionApi from '../../../api/transactionApi';
import productApi from '../../../api/productApi';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

RequestPage.propTypes = {};

function RequestPage(props) {
    const [tabIndex, setTabIndex] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [productList, setProductList] = useState([]);
    const [myProduct, setMyProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const transactions = await transactionApi.getTransactionsWithCondition({
                status: 'pending',
            });
            const products = await productApi.getAllProducts({
                status: 'enable',
                _sort: 'createdAt:DESC',
            });
            const myProducts = await productApi.getProductsByUser({ status: 'enable' });
            setTransactions(transactions.transactions);
            setProductList(products.products);
            setMyProduct(myProducts.products);
            setIsLoading(false);
        })();
    }, []);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <div className="user__request">
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Tabs value={tabIndex} onChange={handleChange}>
                    <Tab value={0} label="Yêu cầu của bạn" />
                    <Tab value={1} label="Người khác muốn đổi với bạn" />
                </Tabs>
            </Box>
            {isLoading ? (
                <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <RequestList
                    tabIndex={tabIndex}
                    transactions={transactions}
                    productList={productList}
                    myProduct={myProduct}
                />
            )}
        </div>
    );
}
export default RequestPage;
