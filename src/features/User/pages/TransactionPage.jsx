import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import transactionApi from '../../../api/transactionApi';
import productApi from '../../../api/productApi';
import { useSnackbar } from 'notistack';
import { sendNotification } from '../../../hook';
import TransactionTable from '../components/TransactionTable';
import conversationApi from '../../../api/conversationApi';

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
                ? { status_product: 'exchanging', status_transaction: 'approved' }
                : { status_product: 'exchanged', status_transaction: 'completed' };
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

    //Xử lí khi 2 bên chọn phương thức giao dịch
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
        console.log('transaction', transaction);

        if (
            (transaction.transaction_method_of_request_recipient === 'free' &&
                transaction.transaction_method_of_request_sender) === 'free'
        ) {
            await transactionApi.findAndUpdateTransaction(transaction_id, {
                status: 'completed',
            });

            //updated products into exchanged
            await productApi.updateProduct(product_id_requested, {
                status: 'exchanged',
            });
            if (exchange_value.length > 12) {
                await productApi.updateProduct(exchange_value, {
                    status: 'exchanged',
                });
            }

            enqueueSnackbar(
                'Các bạn cùng chọn tự trao đổi đồ với nhau ! Giao dịch này sẽ xem như hoàn thành !',
                {
                    variant: 'success',
                }
            );

            //đóng chat
            //Còn trường hợp cả 2 vẫn còn giao dịch khác nên chưa đóng.
            // await conversationApi.closeConversation({
            //     members: [transaction.request_recipient, transaction.request_sender],
            // });

            // gửi thông báo
            sendNotification(
                transaction.request_recipient,
                `Bạn và ${transaction.request_sender} đã thống nhất tự trao đổi đồ với nhau`
            );
            sendNotification(
                transaction.request_sender,
                `Bạn và ${transaction.request_recipient} đã thống nhất tự trao đổi đồ với nhau`
            );
        } else if (
            (transaction.transaction_method_of_request_recipient === 'intermediary' &&
                transaction.transaction_method_of_request_sender) === 'intermediary'
        ) {
            enqueueSnackbar('Đơn trao đổi của bạn sẽ được xác nhận sớm !', {
                variant: 'success',
            });
            navigate(`/${user.username}/delivery`);
            //gửi thông báo
            sendNotification(
                transaction.request_recipient,
                `Bạn và ${transaction.request_sender} đã thống nhất đổi đồ qua trung gian`
            );
            sendNotification(
                transaction.request_sender,
                `Bạn và ${transaction.request_recipient} đã thống nhất đổi đồ qua trung gian`
            );
        } else {
            enqueueSnackbar(
                'Các bạn cần xác nhận cùng phương thức giao dịch để có thể tiếp tục !',
                {
                    variant: 'info',
                }
            );
            if (transaction.transaction_method_of_request_recipient !== 'null') {
                sendNotification(
                    transaction.request_sender,
                    `${transaction.request_recipient} đã cập nhật phương thức giao dịch`
                );
            }
            if (transaction.transaction_method_of_request_sender !== 'null') {
                sendNotification(
                    transaction.request_recipient,
                    `${transaction.request_sender} đã cập nhật phương thức giao dịch`
                );
            }
        }
    };

    const handleTransactionCancel = async (
        request_recipient,
        request_sender,
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

        sendNotification(request_recipient, `Giao dịch giữa bạn và ${request_sender} đã bị huỷ !`);
        sendNotification(request_sender, `Giao dịch giữa bạn và ${request_recipient} đã bị huỷ !`);

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

            {transactions.length > 0 && (
                <TransactionTable
                    tabIndex={tabIndex}
                    user={user}
                    transactions={transactions}
                    productList={productList}
                    onDone={handleTransactionDone}
                    onCancel={handleTransactionCancel}
                />
            )}

            {transactions.length === 0 && (
                <div className="notes info">
                    <p>Hiện chưa có giao dịch nào !</p>
                </div>
            )}
        </div>
    );
}
export default TransactionPage;
