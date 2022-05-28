import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

import { useSelector } from 'react-redux';
//mui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import productApi from '../../../api/productApi';
import categoryApi from '../../../api/categoryApi';
import transactionApi from '../../../api/transactionApi';

import PostList from '../components/PostList';
import NewPostForm from '../components/NewPostForm';

PostPage.propTypes = {};

function PostPage(props) {
    const me = useSelector((state) => state.user.current);
    const [value, setValue] = useState(4);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const my_transaction = useMemo(
        () =>
            transactions.filter(
                (transaction) =>
                    transaction.request_sender === me.username ||
                    transaction.request_recipient === me.username
            ),
        [transactions]
    );

    useEffect(() => {
        (async () => {
            try {
                const products = await productApi.getProductsByUser();
                const categories = await categoryApi.getAllCategory();
                const transactions = await transactionApi.getTransactionsWithCondition({
                    status: ['approved', 'completed'],
                });
                setTransactions(transactions.transactions);
                setCategories(categories.categories);
                setProducts(products.products);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCreateProduct = async (values) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn đăng món đồ này?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            try {
                const product = await productApi.createProduct(values);
                setProducts((preValue) => [...preValue, { ...product.product }]);
                setValue(0);
                swal(
                    'Đăng thành công!',
                    ' Người khác có thể nhìn thấy món đồ của bạn sau khi bài đăng được duyệt!',
                    'success'
                );
            } catch (err) {
                swal('Đăng thất bại!', `${err.message}`, 'error');
            }
        }
    };

    const handleDeleteProduct = async (id) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn xoá món đồ này?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            try {
                const product = await productApi.deleteProduct(id);
                setProducts(products.filter((product) => product._id !== id));
                swal('Thành công!', 'Xoá sản phẩm thành công!', 'success');
            } catch (err) {
                swal('Thất bại', `${err.message}!`, 'error');
            }
        }
    };

    const handleTransactionDone = async (transaction_id, product_id_requested, exchange_value) => {
        // update transaction into completed
        const transaction = await transactionApi.updateTransaction(transaction_id, {
            status: 'completed',
        });
        setTransactions((preValue) => {
            const newValue = [...preValue];
            const transaction_updated = newValue.find(
                (transaction) => transaction._id === transaction_id
            );
            transaction_updated.status = 'completed';

            const data = [
                transaction_updated,
                ...newValue.filter((transaction) => transaction._id !== transaction_id),
            ];
            return [...data];
        });
        //updated products into exchanged
        const product1 = await productApi.updateProduct(product_id_requested, {
            status: 'exchanged',
        });
        console.log(transaction, product1);
        if (exchange_value.length > 12) {
            const product2 = await productApi.updateProduct(product_id_requested, {
                status: 'exchanged',
            });
            console.log(product2);
        }
        setValue(3);
    };

    const handleTransactionCancel = async (
        transaction_id,
        product_id_requested,
        exchange_value
    ) => {
        // delete transaction into completed
        const transaction = await transactionApi.deleteTransaction({ _id: transaction_id });
        console.log(transaction);

        //updated products into exchanged
        const product1 = await productApi.updateProduct(product_id_requested, {
            status: 'enable',
        });
        console.log(product1);
        setProducts((preValue) => {
            const newValue = [...preValue];
            const product_updated = newValue.find(
                (product) => product._id === product_id_requested
            );
            product_updated.status = 'enable';

            const data = [
                product_updated,
                ...newValue.filter((product) => product._id !== product_id_requested),
            ];
            return [...data];
        });

        if (exchange_value.length > 12) {
            const product2 = await productApi.updateProduct(exchange_value, {
                status: 'enable',
            });
            console.log(product2);
            setProducts((preValue) => {
                const newValue = [...preValue];
                const product_updated = newValue.find((product) => product._id === exchange_value);
                product_updated.status = 'enable';

                const data = [
                    product_updated,
                    ...newValue.filter((product) => product._id !== exchange_value),
                ];
                return [...data];
            });
        }
        setValue(1);
    };

    return (
        <div className="post">
            <Box sx={{ width: '90%', margin: '0 auto' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}
                >
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Chưa được duyệt" value={0} />
                        <Tab label="Có thể đổi" value={1} />
                        <Tab label="Đang trao đổi" value={2} />
                        <Tab label="Đã đổi thành công" value={3} />
                        <Tab label="Thêm sản phẩm" value={4} />
                    </Tabs>
                </Box>
                {value === 4 || (
                    <PostList
                        products={products}
                        transactions={my_transaction}
                        tabIndex={value}
                        handleDeleteProduct={handleDeleteProduct}
                        handleTransactionDone={handleTransactionDone}
                        handleTransactionCancel={handleTransactionCancel}
                    />
                )}
                {categories.length > 0 && value === 4 && (
                    <NewPostForm
                        categories={categories}
                        handleCreateProduct={handleCreateProduct}
                    />
                )}
            </Box>
        </div>
    );
}

export default PostPage;
