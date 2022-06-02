import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';

import productApi from '../../../../api/productApi';
import transactionApi from '../../../../api/transactionApi';
import userApi from '../../../../api/userApi';
import mailApi from '../../../../api/mailApi';

import RequestList from './RequestList';
import RequestDialog from './RequestDialog';
import RequestAction from './RequestAction';
import { useNavigate } from 'react-router-dom';

import { sendNotification } from '../../../../hook';

ProductRequests.propTypes = {};

function ProductRequests({ product }) {
    const navigate = useNavigate();
    const me = useSelector((state) => state.user.current);

    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [productList, setProductList] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const queryParams = { product_id_requested: product._id, status: 'pending' };
                const transactions = await transactionApi.getTransactionsWithCondition(queryParams);
                const products = await productApi.getAllProducts({
                    _sort: 'createdAt:DESC',
                    status: 'enable',
                });
                setProductList(products.products);
                setTransactions(transactions.transactions);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [product]);

    const handleClickOpen = async () => {
        try {
            setOpen(true);
            const products = await productApi.getProductsByUser({ status: 'enable' });
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
                    request_recipient: product.createdBy,
                    product_id_requested: product._id,
                    exchange_value: value,
                };

                const { transaction } = await transactionApi.createTransaction(values);
                console.log(transaction);
                if (!transaction) {
                    throw new Error('Yêu cầu của bạn đã gửi không thành công');
                }
                setTransactions((preValue) => [{ ...transaction }, ...preValue]);
                swal('Thành công!', 'Yêu cầu của bạn đã gửi thành công!', 'success');
                sendNotification(
                    product.createdBy,
                    `${transaction.request_sender} đã gửi 1 yêu cầu trao đổi tới ${product.product_name}`
                );
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
            try {
                // Khi đồng ý đổi , tất cả transaction có product_id_requested và exchange_value(nếu là đồ)
                //sẽ bị xoá hết(ngoại trừ transaction đươc approve)

                //cập nhật status của transaction thành approved
                const transaction_approved = await transactionApi.updateTransaction(
                    transaction_id,
                    {
                        status: 'approved',
                    }
                );
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
                navigate(`/${product.createdBy}/transactions`);

                swal(
                    'Thành công',
                    `Bây giờ Bạn và ${request_sender} có thể xem thông tin và trò chuyện với nhau!`,
                    'success'
                );

                //gửi thông báo
                sendNotification(
                    request_sender,
                    `${product.createdBy} đã chấp nhận yêu cầu của bạn tới món đồ ${product.product_name}`
                );

                //gửi mail cho người được chấp nhận biết
                const {
                    user: { email },
                } = await userApi.getUserByUserName(request_sender);
                console.log('Gửi email đến người này:', email);
                if (email) {
                    const dataMail = {
                        email: email,
                        subject: `chodoidoVN Thông báo: Bạn đã được ${product.createdBy} chấp nhận yêu cầu trao đổi!`,
                        content: `<div><p>${product.createdBy} đã chấp nhận yêu cầu trao đổi của bạn gửi tới
                        <a href="http://localhost:3000/products/${product._id}">sản phẩm này !</a>
                        </p>
                        <p>Note: Vui lòng xác nhận nếu đã đổi thành công !</p>
                        </div>`,
                    };
                    await mailApi.sendMailNotification(dataMail);
                }
            } catch (err) {
                swal('Thất bại', `Có lỗi:${err.message}!`, 'error');
            }
        }
    };

    return (
        <div className="request">
            {product.status === 'enable' ? (
                <>
                    <RequestAction
                        me={me}
                        product={product}
                        transactions={transactions}
                        handleClickOpen={handleClickOpen}
                    />
                    <RequestList
                        me={me}
                        product={product}
                        productList={productList}
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
                <div class="notes info">
                    <p>
                        <strong>Chú ý: </strong>
                        Không thể gửi yêu cầu đến sản phẩm này !
                    </p>
                </div>
            )}
        </div>
    );
}

export default ProductRequests;
