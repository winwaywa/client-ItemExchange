import './styles.scss';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatTime } from '../../../../utils';

RequestList.propTypes = {};

function RequestList({ tabIndex, transactions, productList, myProduct }) {
    const me = useSelector((state) => state.user.current);

    const transactionsFilter = useMemo(() => {
        const condition = tabIndex === 0 ? 'request_sender' : 'request_recipient';

        return transactions.filter((transaction) => transaction[condition] === me.username);
    }, [tabIndex]);

    console.log(transactionsFilter);
    return (
        <div className="list">
            {tabIndex === 0 && (
                <>
                    <h2 className="heading-secondary">Danh sách yêu cầu đang gửi đi</h2>
                    <ul>
                        {transactionsFilter.map((transaction) => (
                            <li key={transaction._id}>
                                <p>
                                    <span>{formatTime(transaction.createdAt)} : </span>
                                    <span>Bạn đã gửi một yêu cầu trao đổi với món đồ </span>
                                    <Link to={`/products/${transaction.product_id_requested}`}>
                                        {
                                            productList.filter(
                                                (product) =>
                                                    product._id === transaction.product_id_requested
                                            )[0].product_name
                                        }
                                    </Link>
                                </p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {tabIndex === 1 && (
                <>
                    <h2 className="heading-secondary">Danh sách yêu cầu đang gửi đến bạn</h2>
                    <ul>
                        {myProduct.map((product) => (
                            <li>
                                <Link to={`/products/${product._id}`}>{product.product_name}</Link>
                                {transactions
                                    .filter(
                                        (transaction) =>
                                            transaction.product_id_requested === product._id
                                    )
                                    .map((transaction) => (
                                        <p>
                                            {formatTime(transaction.createdAt)} :{' '}
                                            {transaction.request_sender} đã gửi một yêu cầu
                                        </p>
                                    ))}
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {transactionsFilter.length < 1 && 'Không có yêu cầu nào !'}
        </div>
    );
}

export default RequestList;
