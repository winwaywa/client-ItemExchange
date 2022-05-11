import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
RequestList.propTypes = {};

function RequestList({ tabIndex, transactions }) {
    const me = useSelector((state) => state.user.current);

    const transactionsFilter = useMemo(() => {
        const condition = tabIndex === 0 ? 'request_sender' : 'request_recipient';

        return transactions.filter(
            (transaction) =>
                transaction[condition] === me.username && transaction.status === 'pending'
        );
    });

    return (
        <div>
            {tabIndex}
            <ul>
                {transactionsFilter.map((transaction) => (
                    <li>
                        <Link to={`/products/${transaction.product_id_requested}`}>
                            {transaction.product_id_requested}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RequestList;
