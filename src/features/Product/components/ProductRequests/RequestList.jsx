import './styles.scss';
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatTime } from '../../../../utils';
import { formatPrice } from '../../../../utils';

RequestList.propTypes = {};

function RequestList({ me, product, productList, transactions, onClickCancel, onClickApprove }) {
    const handleApproveRequest = (e, transaction_id, request_sender, exchange_value) => {
        e.preventDefault();
        onClickApprove(transaction_id, request_sender, exchange_value);
    };
    const handleCancelRequest = (e, transaction_id) => {
        e.preventDefault();
        onClickCancel(transaction_id);
    };
    console.log(transactions);

    return (
        <ul className="request__list">
            <h2>Danh sách các yêu cầu</h2>
            {transactions.length > 0
                ? transactions.map((transaction) => (
                      <li key={transaction._id}>
                          <div className="request__item">
                              <p>
                                  <span className="request__time">
                                      {formatTime(transaction.createdAt)} :{' '}
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
