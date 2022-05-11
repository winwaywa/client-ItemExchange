import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';

import productApi from '../../../../api/productApi';
import transactionApi from '../../../../api/transactionApi';

import RequestList from './RequestList';
import RequestDialog from './RequestDialog';
import RequestAction from './RequestAction';

ProductRequests.propTypes = {};

function ProductRequests({ user, product }) {
    const me = useSelector((state) => state.user.current);

    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const queryParams = { product_id_requested: product._id };
                const transactions = await transactionApi.getTransactionsWithCondition(queryParams);
                setTransactions(transactions.transactions);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [product]);

    const handleClickOpen = async () => {
        try {
            setOpen(true);
            const products = await productApi.getProductsByUser();
            setProducts(products.products);
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async (value) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn đổi không?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            //Xử lý yêu cầu đổi
            try {
                const values = {
                    request_recipient: user.username,
                    product_id_requested: product._id,
                    exchange_value: value,
                };
                const transaction = await transactionApi.createTransaction(values);
                if (!transaction) {
                    throw new Error('Yêu cầu của bạn đã gửi không thành công');
                }
                setTransactions((preValue) => [...preValue, { ...transaction.transaction }]);
                swal('Đã gửi!', 'Yêu cầu của bạn đã gửi thành công!', 'success');
            } catch (err) {
                swal('Gửi thất bại!', 'Yêu cầu của bạn gửi thất bại!', 'error');
            }
        }
    };

    return (
        <div className="request">
            <RequestAction
                me={me}
                user={user}
                product={product}
                transactions={transactions}
                handleClickOpen={handleClickOpen}
            />
            <RequestList transactions={transactions} />
            <RequestDialog
                open={open}
                handleClose={handleClose}
                handleConfirm={handleConfirm}
                products={products}
            />
        </div>
    );
}

export default ProductRequests;
