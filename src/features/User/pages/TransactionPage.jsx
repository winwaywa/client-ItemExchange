import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import transactionApi from '../../../api/transactionApi';
import productApi from '../../../api/productApi';
import TransactionTable from '../components/TransactionTable';
import { useSnackbar } from 'notistack';
TransactionPage.propTypes = {};

function TransactionPage({ user }) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const status =
            tabIndex === 0
                ? { status_product: ['exchanging', 'exchanged'], status_transaction: 'approved' }
                : { status_product: ['exchanging', 'exchanged'], status_transaction: 'completed' };
        (async () => {
            const { transactions } = await transactionApi.getTransactionsWithCondition({
                status: status.status_transaction,
            });
            const my_transaction = transactions.filter(
                (transaction) =>
                    transaction.request_sender === user.username ||
                    transaction.request_recipient === user.username
            );
            const products = await productApi.getAllProducts({
                status: status.status_product,
                _sort: 'createdAt:DESC',
            });

            setTransactions(my_transaction);
            setProductList(products.products);
        })();
    }, [tabIndex]);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleTransactionDone = async (
        transaction_id,
        product_id_requested,
        exchange_value,
        method
    ) => {
        // update transaction into ,then wait remaining person confirm
        const { transaction } = await transactionApi.findAndUpdateTransaction(transaction_id, {
            ...method,
        });
        console.log(transaction);
        console.log(transaction.transaction_method_of_request_recipient);
        console.log(transaction.transaction_method_of_request_sender);
        if (
            (transaction.transaction_method_of_request_recipient === 'free' &&
                transaction.transaction_method_of_request_sender) === 'free'
        ) {
            await transactionApi.findAndUpdateTransaction(transaction_id, {
                status: 'completed',
            });

            //updated products into exchanged
            const product1 = await productApi.updateProduct(product_id_requested, {
                status: 'exchanged',
            });
            console.log(transaction, product1);
            if (exchange_value.length > 12) {
                const product2 = await productApi.updateProduct(product_id_requested, {
                    status: 'exchanged',
                });
                console.log(product2);
            }
            enqueueSnackbar(
                'Các bạn cùng chọn tự trao đổi đồ với nhau ! Giao dịch này sẽ xem như hoàn thành !',
                {
                    variant: 'success',
                }
            );
        } else if (
            (transaction.transaction_method_of_request_recipient === 'intermediary' &&
                transaction.transaction_method_of_request_sender) === 'intermediary'
        ) {
            enqueueSnackbar('Đơn trao đổi của bạn sẽ được xác nhận sớm !', {
                variant: 'success',
            });
            navigate('/delivery');
        } else {
            enqueueSnackbar(
                'Các bạn cần chọn cùng một phương thức giao dịch để có thể tiếp tục !',
                {
                    variant: 'info',
                }
            );
        }
    };

    const handleTransactionCancel = async (
        transaction_id,
        product_id_requested,
        exchange_value
    ) => {
        // delete transaction
        await transactionApi.deleteTransaction({ _id: transaction_id });

        //updated products into exchanged
        await productApi.updateProduct(product_id_requested, {
            status: 'enable',
        });

        if (exchange_value.length > 12) {
            await productApi.updateProduct(exchange_value, {
                status: 'enable',
            });
        }
        navigate(`/${user.username}`);
    };

    return (
        <div className="user__transaction transaction">
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Tabs value={tabIndex} onChange={handleChange}>
                    <Tab value={0} label="Đang giao dịch" />
                    <Tab value={1} label="Hoàn thành" />
                </Tabs>
            </Box>
            {transactions.length > 0 ? (
                <TransactionTable
                    user={user}
                    tabIndex={tabIndex}
                    transactions={transactions}
                    productList={productList}
                    onDone={handleTransactionDone}
                    onCancel={handleTransactionCancel}
                />
            ) : (
                <div class="notes info">
                    <p>Hiện chưa có giao dịch nào !</p>
                </div>
            )}
        </div>
    );
}
export default TransactionPage;
