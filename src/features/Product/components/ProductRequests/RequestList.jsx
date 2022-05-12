import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatPrice } from '../../../../utils';

RequestList.propTypes = {};

function RequestList({ me, user, transactions }) {
    return (
        <ul className="request__list">
            <h2>Danh sách các yêu cầu</h2>
            {transactions.length > 0
                ? transactions.map((transaction) => (
                      <li key={transaction._id}>
                          <Link to={`/user/${transaction.request_sender}`}>
                              {transaction.request_sender}
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
                              <span> {formatPrice(transaction.exchange_value)}</span>
                          )}
                          {/* Nếu là chủ món đồ thì hiện nút để duyệt */}
                          {me.username === user.username && (
                              <>
                                  <a href="#" className="btn-text">
                                      Đổi
                                  </a>
                                  <a href="#" className="btn-text">
                                      Huỷ
                                  </a>
                              </>
                          )}
                          {me.username === transaction.request_sender && (
                              <a href="#" className="btn-text">
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
