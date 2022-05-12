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
    }, [tabIndex]);

    return (
        <div>
            <ul>
                {transactionsFilter.map((transaction) => (
                    <li key={transaction._id}>
                        {tabIndex === 0 && (
                            <>
                                <span>Bạn đã yêu cầu trao đổi với sản phẩm </span>
                                <Link to={`/products/${transaction.product_id_requested}`}>
                                    {transaction.product_id_requested}
                                </Link>
                                <span> vào lúc {transaction.createdAt}</span>
                            </>
                        )}
                        {tabIndex === 1 && (
                            <>
                                <span>
                                    {transaction.request_sender} đã gửi yêu cầu đổi với món đồ{' '}
                                </span>
                                <Link to={`/products/${transaction.product_id_requested}`}>
                                    {transaction.product_id_requested}
                                </Link>
                                <span> vào lúc {transaction.createdAt}</span>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RequestList;
