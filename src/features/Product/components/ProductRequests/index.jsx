import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { Navigate } from 'react-router-dom';

import productApi from '../../../../api/productApi';
import transactionApi from '../../../../api/transactionApi';

import RequestList from './RequestList';
import RequestDialog from './RequestDialog';
import RequestAction from './RequestAction';
import { useNavigate } from 'react-router-dom';

ProductRequests.propTypes = {};

function ProductRequests({ user, product }) {
    const navigate = useNavigate();
    const me = useSelector((state) => state.user.current);

    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const queryParams = { product_id_requested: product._id, status: 'pending' };
                const transactions = await transactionApi.getTransactionsWithCondition(queryParams);
                setTransactions(transactions.transactions);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [product]);

    const handleClickOpen = async () => {
        try {
            setOpen(true);
            const products = await productApi.getProductsByUser({ status: 'disable' });
            setProducts(products.products);
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async (value) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn đổi không?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            //Xử lý yêu cầu đổi
            try {
                const values = {
                    request_recipient: user.username,
                    product_id_requested: product._id,
                    exchange_value: value,
                };
                const transaction = await transactionApi.createTransaction(values);
                if (!transaction) {
                    throw new Error('Yêu cầu của bạn đã gửi không thành công');
                }
                setTransactions((preValue) => [...preValue, { ...transaction.transaction }]);
                swal('Thành công!', 'Yêu cầu của bạn đã gửi thành công!', 'success');
            } catch (err) {
                swal('Thất bại!', 'Yêu cầu của bạn gửi thất bại!', 'error');
            }
        }
    };

    const handleCancelRequest = async (transaction_id) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn huỷ yêu cầu này?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            try {
                const transaction = await transactionApi.deleteTransaction({ _id: transaction_id });
                console.log(transaction);
                if (!transaction) {
                    throw new Error('Yêu cầu huỷ của bạn đã không thành công');
                }
                setTransactions((preValue) =>
                    preValue.filter((value) => value._id !== transaction_id)
                );
                swal('Thành công', 'Đã huỷ yêu cầu thành công!', 'success');
            } catch (err) {
                swal('Thất bại', `${err.message}!`, 'error');
            }
        }
    };

    const handleApproveRequest = async (transaction_id, request_sender, exchange_value) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn đổi với người này? Các yêu cầu khác gửi đến cũng như các yêu cầu bạn gửi đến người khác có liên quan món đồ này sẽ bị huỷ bỏ!',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            // Khi đồng ý đổi , tất cả transaction có product_id_requested và exchange_value(nếu là đồ)
            //sẽ bị xoá hết(ngoại trừ transaction đươc approve)

            //cập nhật status của transaction thành approved
            const transaction_approved = await transactionApi.updateTransaction(transaction_id, {
                status: 'approved',
            });
            console.log(transaction_approved);

            // Xoá tất cả các transaction còn lại mà gửi khác gửi đến của món đồ được yêu cầu
            const transaction_cancelled_1 = await transactionApi.deleteTransaction({
                product_id_requested: product._id,
                status: 'pending',
            });
            console.log(transaction_cancelled_1);

            // xoá transaction của món đồ được yêu cầu đang gửi tới món khác
            const transaction_cancelled_2 = await transactionApi.deleteTransaction({
                exchange_value: product._id,
                status: 'pending',
            });
            console.log(transaction_cancelled_2);

            // Xoá tất cả các transaction còn lại mà gửi khác gửi đến món đồ yêu cầu đổi(tiền or món đồ)
            if (exchange_value.length > 12) {
                const transaction_cancelled_3 = await transactionApi.deleteTransaction({
                    product_id_requested: exchange_value,
                    status: 'pending',
                });
                console.log(transaction_cancelled_3);
            }

            // xoá transaction của món đồ yêu cầu đổi đang gửi tới các món khác(tiền or món đồ)
            if (exchange_value.length > 12) {
                const transaction_cancelled_4 = await transactionApi.deleteTransaction({
                    exchange_value: exchange_value,
                    status: 'pending',
                });
                console.log(transaction_cancelled_4);
            }

            //cập nhật status 2 product thành exchanging
            const product_of_recipient = await productApi.updateProduct(product._id, {
                status: 'exchanging',
            });
            console.log(product_of_recipient);
            if (exchange_value.length > 12) {
                const product_of_sender = await productApi.updateProduct(exchange_value, {
                    status: 'exchanging',
                });
                console.log(product_of_sender);
            }

            //Chuyển sang trang chat
            navigate('/chat');

            swal(
                'Thành công',
                `Bây giờ Bạn và ${request_sender} có thể xem thông tin và trò chuyện với nhau!`,
                'success'
            );

            try {
            } catch (err) {
                swal('Thất bại', `${err.message}!`, 'error');
            }
        }
    };

    return (
        <div className="request">
            {product.status !== 'exchanging' ? (
                <>
                    <RequestAction
                        me={me}
                        user={user}
                        product={product}
                        transactions={transactions}
                        handleClickOpen={handleClickOpen}
                    />
                    <RequestList
                        me={me}
                        user={user}
                        transactions={transactions}
                        onClickCancel={handleCancelRequest}
                        onClickApprove={handleApproveRequest}
                    />
                    <RequestDialog
                        open={open}
                        handleClose={handleClose}
                        handleConfirm={handleConfirm}
                        products={products}
                    />
                </>
            ) : (
                'Sản phẩm này đang trong quá trình trao đổi!'
            )}
        </div>
    );
}

export default ProductRequests;
