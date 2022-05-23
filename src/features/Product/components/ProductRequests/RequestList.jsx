import './styles.scss';
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatPrice } from '../../../../utils';

RequestList.propTypes = {};

function RequestList({ me, product, transactions, onClickCancel, onClickApprove }) {
    const handleApproveRequest = (e, transaction_id, request_sender, exchange_value) => {
        e.preventDefault();
        onClickApprove(transaction_id, request_sender, exchange_value);
    };
    const handleCancelRequest = (e, transaction_id) => {
        e.preventDefault();
        onClickCancel(transaction_id);
    };

    return (
        <ul className="request__list">
            <h2>Danh sách các yêu cầu</h2>
            {transactions.length > 0
                ? transactions.map((transaction) => (
                      <li key={transaction._id} className="request__item">
                          <Link to={`/user/${transaction.request_sender}`}>
                              {me && me.username === transaction.request_sender
                                  ? 'Bạn'
                                  : transaction.request_sender}
                          </Link>
                          <span>&nbsp;muốn đổi sản phẩm này với&nbsp;</span>
                          {transaction.exchange_value.length > 12 ? (
                              <>
                                  <span>sản phẩm:&nbsp;</span>
                                  <Link to={`/products/${transaction.exchange_value}`}>
                                      {transaction.exchange_value}
                                  </Link>
                              </>
                          ) : (
                              <span>{formatPrice(transaction.exchange_value)}</span>
                          )}
                          {/* Nếu là chủ món đồ thì hiện nút để duyệt/huỷ */}
                          {me && me.username === product.createdBy && (
                              <>
                                  <a
                                      href="#"
                                      className="btn-text"
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
                                  </a>
                                  <a
                                      href="#"
                                      className="btn-text"
                                      onClick={(e) => handleCancelRequest(e, transaction._id)}
                                  >
                                      Huỷ
                                  </a>
                              </>
                          )}
                          {/* Nếu là chủ người gửi yêu cầu thì hiện nút để huỷ */}
                          {me && me.username === transaction.request_sender && (
                              <a
                                  href="#"
                                  className="btn-text"
                                  onClick={(e) => handleCancelRequest(e, transaction._id)}
                              >
                                  Huỷ
                              </a>
                          )}
                      </li>
                  ))
                : 'Không có yêu cầu nào !'}
        </ul>
    );
}

export default RequestList;
