import { useState, useEffect, useMemo } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string'; // chuyển query thành object

import transactionApi from '../../../api/transactionApi';
import productApi from '../../../api/productApi';
import { useSnackbar } from 'notistack';
import { sendNotification } from '../../../hook';
import TransactionTable from '../components/TransactionTable';
import conversationApi from '../../../api/conversationApi';
import deliveryApi from '../../../api/deliveryApi';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

TransactionPage.propTypes = {};

function TransactionPage({ user }) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const location = useLocation();

    const [transactions, setTransactions] = useState([]);
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [tabIndex, setTabIndex] = useState();

    useMemo(() => {
        const status = queryString.parse(location.search).status || 'approved';
        setTabIndex(status);
    }, [location.search]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            navigate({
                pathname: '',
                search: `?status=${tabIndex}`,
            });
            const { transactions } = await transactionApi.getTransactionsWithCondition({
                status: tabIndex,
            });
            const my_transaction = transactions.filter(
                (transaction) =>
                    transaction.request_sender === user.username ||
                    transaction.request_recipient === user.username
            );
            const products = await productApi.getAllProducts({
                _sort: 'createdAt:DESC',
            });

            setTransactions(my_transaction);
            setProductList(products.products);
            setIsLoading(false);
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
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn cập nhật phương thức giao dịch?',
            icon: 'warning',
            dangerMode: true,
        });

        if (willDelete) {
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

                navigate({
                    pathname: '',
                    search: `?status=completed`,
                });

                //kiểm tra còn giao dịch nào giữa 2 người này ko và đóng chat
                const isExchanging = transactions.filter(
                    (t) =>
                        t._id !== transaction._id &&
                        (t.request_recipient === transaction.request_recipient ||
                            t.request_recipient === transaction.request_sender) &&
                        (t.request_sender === transaction.request_recipient ||
                            t.request_sender === transaction.request_sender)
                ).length;
                if (!isExchanging) {
                    await conversationApi.closeConversation({
                        members: [transaction.request_recipient, transaction.request_sender],
                    });
                }

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

                //tạo đơn vận chuyển
                await deliveryApi.createDelivery({ transaction_id });

                //qua trung gian chưa đóng chat, khi shipper xác nhận mới đóng

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
        }
    };

    // nếu huỷ giao dịch
    const handleTransactionCancel = async (
        request_recipient,
        request_sender,
        transaction_id,
        product_id_requested,
        exchange_value
    ) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn huỷ giao dịch này ?',
            icon: 'warning',
            dangerMode: true,
        });

        if (willDelete) {
            // update transaction to cancelled
            await transactionApi.findAndUpdateTransaction(transaction_id, {
                status: 'cancelled',
            });

            //updated products into exchanged
            await productApi.updateProduct(product_id_requested, {
                status: 'enable',
            });

            if (exchange_value.length > 12) {
                await productApi.updateProduct(exchange_value, {
                    status: 'enable',
                });
            }

            // kiểm tra còn giao dịch nào giữa 2 người này ko và đóng chat
            const isExchanging = transactions.filter(
                (t) =>
                    t._id !== transaction_id &&
                    (t.request_recipient === request_recipient ||
                        t.request_recipient === request_sender) &&
                    (t.request_sender === request_recipient || t.request_sender === request_sender)
            ).length;
            if (!isExchanging) {
                await conversationApi.closeConversation({
                    members: [request_recipient, request_sender],
                });
            }

            sendNotification(
                request_recipient,
                `Giao dịch giữa bạn và ${request_sender} đã bị huỷ !`
            );
            sendNotification(
                request_sender,
                `Giao dịch giữa bạn và ${request_recipient} đã bị huỷ !`
            );

            navigate(`/${user.username}`);
        }
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
                    <Tab value={'approved'} label="Đang giao dịch" />
                    <Tab value={'completed'} label="Hoàn thành" />
                    <Tab value={'cancelled'} label="Đã huỷ" />
                </Tabs>
            </Box>
            {!isLoading ? (
                <TransactionTable
                    tabIndex={tabIndex}
                    user={user}
                    transactions={transactions}
                    productList={productList}
                    onDone={handleTransactionDone}
                    onCancel={handleTransactionCancel}
                />
            ) : (
                <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
                    <CircularProgress />
                </Box>
            )}

            {!isLoading && transactions.length === 0 && (
                <div className="notes info">
                    <p>Hiện chưa có giao dịch nào !</p>
                </div>
            )}
        </div>
    );
}
export default TransactionPage;
