import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import transactionApi from '../../../../api/transactionApi';
import { formatTime } from '../../../../utils';
import { formatPrice } from '../../../../utils';

RequestAction.propTypes = {};

function RequestAction({
    me,
    product,
    transactions,
    handleClickOpen,
    productList,
    onClickCancel,
    onClickApprove,
}) {
    const [listRequest, setListRequest] = useState([]);
    useEffect(() => {
        (async () => {
            const { transactions: transactionAll } =
                await transactionApi.getTransactionsWithCondition({
                    status: 'pending',
                });

            // xem thử người này dùng món đồ này có gửi yêu cầu nào đến đồ của bạn ?
            const requests = transactionAll.filter(
                (transaction) =>
                    transaction.request_recipient === me.username &&
                    transaction.exchange_value === product._id
            );
            setListRequest(requests);
        })();
    }, [transactions]);

    console.log(listRequest);

    const handleApproveRequest = (e, transaction_id, request_sender, exchange_value) => {
        e.preventDefault();
        onClickApprove(transaction_id, request_sender, exchange_value);
    };
    const handleCancelRequest = (e, transaction_id) => {
        e.preventDefault();
        onClickCancel(transaction_id);
    };

    return (
        <div>
            {/* Chưa đăng nhập => thông báo cần đăng nhập */}
            {/* Đã đăng nhập và đã gửi yc=> thông báo chỉ đc 1 lần gửi */}
            {/* Đã đăng nhập chưa gửi yc=> hiện nút gửi */}
            {/* Đã đăng nhập nhưng là sp của mình=> tbao:Đây là sản phẩm của bạn */}
            {!me && (
                <div class="notes info">
                    <p>
                        <strong>Chú ý: </strong>
                        <span>Vui lòng&nbsp;</span>
                        <Link to="/login">đăng nhập</Link>
                        <span>&nbsp;để có thể gửi yêu cầu trao đổi !</span>
                    </p>
                </div>
            )}

            {me && product.createdBy === me.username && (
                <div class="notes info">
                    <p>
                        <strong>Chú ý:</strong> Đây là sản phẩm của bạn !
                    </p>
                </div>
            )}
            {me &&
                product.createdBy !== me.username &&
                transactions.findIndex(
                    (transaction) =>
                        transaction.product_id_requested === product._id &&
                        transaction.request_sender === me.username
                ) >= 0 && (
                    <div class="notes info">
                        <p>
                            <strong>Chú ý:</strong> Mỗi sản phẩm bạn chỉ có thể gửi tối đa 1 yêu cầu
                            !
                        </p>
                    </div>
                )}
            {me &&
                product.createdBy !== me.username &&
                transactions.findIndex(
                    (transaction) =>
                        transaction.product_id_requested === product._id &&
                        transaction.request_sender === me.username
                ) < 0 && (
                    <button
                        href="#"
                        className="btn btn--primary btn--small u-margin-top-small u-margin-bottom-small"
                        onClick={handleClickOpen}
                    >
                        Gửi yêu cầu
                    </button>
                )}

            {me && product.createdBy !== me.username && listRequest.length > 0 && (
                <ul className="request__list">
                    {listRequest.map((transaction) => (
                        <li key={transaction._id}>
                            <div className="request__item">
                                <p>
                                    <span className="request__time">
                                        {formatTime(transaction.createdAt)} :{' '}
                                    </span>
                                    <Link to={`/${transaction.request_sender}`}>
                                        {transaction.request_sender}
                                    </Link>
                                    <span>&nbsp;đã gửi yêu cầu đổi món đồ này lấy&nbsp;</span>
                                    <Link to={`/products/${transaction.product_id_requested}`}>
                                        {
                                            productList.filter(
                                                (product) =>
                                                    product._id === transaction.product_id_requested
                                            )[0]?.product_name
                                        }
                                    </Link>
                                    <span>&nbsp;của bạn.</span>
                                </p>
                                {/* Nếu là chủ món đồ thì hiện nút để duyệt/huỷ */}
                                <div className="group-action">
                                    <button
                                        href="#"
                                        className="btn btn--small btn--success"
                                        onClick={(e) =>
                                            handleApproveRequest(
                                                e,
                                                transaction._id,
                                                transaction.request_recipient,
                                                transaction.product_id_requested
                                            )
                                        }
                                    >
                                        Đổi
                                    </button>
                                    <button
                                        href="#"
                                        className="btn btn--small btn--delete"
                                        onClick={(e) => handleCancelRequest(e, transaction._id)}
                                    >
                                        Huỷ
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RequestAction;
