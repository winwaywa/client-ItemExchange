import { useEffect, useState } from 'react';
import productApi from '../../../../api/productApi';
import transactionApi from '../../../../api/transactionApi';
import { Tabs, Tab } from '@mui/material';
import PostList from '../../components/PostList';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { sendNotification } from '../../../../hook';

import PropTypes from 'prop-types';
PostPage.propTypes = {};

function PostPage(props) {
    const [productList, setProductList] = useState([]);

    const [tabIndex, setTabIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const status = tabIndex === 0 ? 'enable' : 'disable';
        (async () => {
            setIsLoading(true);
            const products = await productApi.getProductsByUser({ status });
            setProductList(products.products);
            setIsLoading(false);
        })();
    }, [tabIndex]);

    const handleChangeTab = (e, newTab) => {
        setTabIndex(newTab);
    };

    //delete post
    const handleDeletePost = async (product_id) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn xoá món đồ này?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            try {
                const { product } = await productApi.updateProduct(product_id, {
                    status: 'deleted',
                });
                setProductList(productList.filter((product) => product._id !== product_id));

                // xoá những yêu cầu đến sp này và những yêu cầu gửi đi từ sp này
                const { transactions } = await transactionApi.deleteTransaction({
                    product_id_requested: product._id,
                    status: 'pending',
                });
                console.log(
                    ' xoá những yêu cầu đến sp này và những yêu cầu gửi đi từ sp này',
                    transactions
                );
                // gửi thông báo đến những người mà gửi yêu cầu đến sp này
                transactions.forEach((transaction) =>
                    sendNotification(
                        transaction.request_sender,
                        `Yêu cầu của bạn tới món đồ ${product.product_name} đã huỷ do ${product.createdBy} đã xoá món đồ này `
                    )
                );
                const { transactions: transactions_1 } = await transactionApi.deleteTransaction({
                    exchange_value: product._id,
                    status: 'pending',
                });
                console.log(
                    ' xoá những yêu cầu đến sp này và những yêu cầu gửi đi từ sp này',
                    transactions_1
                );

                swal('Thành công!', 'Xoá sản phẩm thành công!', 'success');
            } catch (err) {
                swal('Thất bại', `${err.message}!`, 'error');
            }
        }
    };

    return (
        <div className="user__post">
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Tabs value={tabIndex} onChange={handleChangeTab}>
                    <Tab value={0} label="Đã được duyệt" />
                    <Tab value={1} label="Chưa duyệt" />
                </Tabs>
            </Box>
            {isLoading ? (
                <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <PostList productList={productList} handleDeletePost={handleDeletePost} />
            )}
            {!isLoading && productList.length === 0 && (
                <div className="notes info">
                    <p> Chưa có bài viết nào !</p>
                </div>
            )}
        </div>
    );
}

export default PostPage;
