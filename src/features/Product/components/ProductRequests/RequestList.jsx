import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatPrice } from '../../../../utils';

RequestList.propTypes = {};

function RequestList({ transactions }) {
    return (
        <ul className="request__list">
            <h2>Danh sách các yêu cầu</h2>
            {transactions.length > 0
                ? transactions.map((transaction) => (
                      <li key={transaction._id}>
                          <Link to={`/user/${transaction.request_sender}`}>
                              {transaction.request_sender}
                          </Link>
                          &nbsp;muốn đổi sản phẩm này với&nbsp;
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
                      </li>
                  ))
                : 'Không có yêu cầu nào !'}
        </ul>
    );
}

export default RequestList;
