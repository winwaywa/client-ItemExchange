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

    const handleCalculatorRequest = (product) =>
        transactions
            .filter((transaction) => transaction.product_id_requested === product._id)
            .map((transaction) => (
                <p>
                    {formatTime(transaction.createdAt)} : {transaction.request_sender} đã gửi một
                    yêu cầu
                </p>
            ));

    return (
        <div className="list">
            {tabIndex === 0 && (
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
                    {transactionsFilter.length < 1 && (
                        <div class="notes info">
                            <p>Chưa có yêu cầu nào !</p>
                        </div>
                    )}
                </ul>
            )}
            {tabIndex === 1 && (
                <ul>
                    {myProduct.map((product) => (
                        <li>
                            <Link to={`/products/${product._id}`}>{product.product_name}</Link>
                            {` (${handleCalculatorRequest(product).length} yêu cầu)`}
                            {handleCalculatorRequest(product)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RequestList;
