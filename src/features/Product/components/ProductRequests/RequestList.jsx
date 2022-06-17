import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../../utils';

RequestList.propTypes = {};

function RequestList({ me, product, productList, transactions, onClickCancel, onClickApprove }) {
    const handleApproveRequest = (e, transaction_id, request_sender, exchange_value) => {
        e.preventDefault();
        onClickApprove(transaction_id, request_sender, exchange_value);
    };
    const handleCancelRequest = async (e, transaction_id) => {
        e.preventDefault();
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn huỷ yêu cầu này?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            try {
                onClickCancel(transaction_id);
                swal('Thành công', 'Đã huỷ yêu cầu thành công!', 'success');
            } catch (err) {
                swal('Thất bại', `${err.message}!`, 'error');
            }
        }
    };
    console.log(transactions);

    const getRemainingTime = (createdAt, transaction_id) => {
        const remainingTime = Number(Date.now() - Number(new Date(createdAt)));
        const day = Math.floor(3 - remainingTime / (24 * 60 * 60 * 1000) || 0);
        const hour = Math.floor(
            24 - (remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000) || 0
        );
        const minutes = Math.floor(60 - (remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        if (Number(Date.now() - Number(new Date(createdAt)) > 72 * 60 * 60 * 1000)) {
            onClickCancel(transaction_id);
        }
        console.log(Math.floor(-1));
        return `${day} ngày ${hour} giờ ${minutes} phút`;
    };

    return (
        <ul className="request__list">
            <h2>Danh sách các yêu cầu</h2>
            {transactions.length > 0
                ? transactions.map((transaction) => (
                      <li key={transaction._id}>
                          <div className="request__item">
                              <p>
                                  <span className="request__time">
                                      Còn {getRemainingTime(transaction.createdAt, transaction._id)}
                                      :{' '}
                                  </span>
                                  <Link to={`/${transaction.request_sender}`}>
                                      {me && me.username === transaction.request_sender
                                          ? 'Bạn'
                                          : transaction.request_sender}
                                  </Link>
                                  <span>&nbsp;muốn đổi sản phẩm này với&nbsp;</span>
                                  {transaction.exchange_value.length > 12 ? (
                                      <>
                                          <Link to={`/products/${transaction.exchange_value}`}>
                                              {
                                                  productList.filter(
                                                      (product) =>
                                                          product._id === transaction.exchange_value
                                                  )[0]?.product_name
                                              }
                                          </Link>
                                      </>
                                  ) : (
                                      <span>{formatPrice(transaction.exchange_value)}</span>
                                  )}
                              </p>
                              {/* Nếu là chủ món đồ thì hiện nút để duyệt/huỷ */}
                              {me && me.username === product.createdBy && (
                                  <div className="group-action">
                                      <button
                                          href="#"
                                          className="btn btn--small btn--success"
                                          onClick={(e) =>
                                              handleApproveRequest(
                                                  e,
                                                  transaction._id,
                                                  transaction.request_sender,
                                                  transaction.exchange_value
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
                              )}
                              {/* Nếu là chủ người gửi yêu cầu thì hiện nút để huỷ */}
                              {me && me.username === transaction.request_sender && (
                                  <div className="group-action">
                                      <button
                                          href="#"
                                          className="btn btn--small btn--delete"
                                          onClick={(e) => handleCancelRequest(e, transaction._id)}
                                      >
                                          Huỷ
                                      </button>
                                  </div>
                              )}
                          </div>
                      </li>
                  ))
                : 'Không có yêu cầu nào !'}
        </ul>
    );
}

export default RequestList;
