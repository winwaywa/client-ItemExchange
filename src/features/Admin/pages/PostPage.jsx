import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { sendNotification } from '../../../hook';

//mui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import productApi from '../../../api/productApi';
import transactionApi from '../../../api/transactionApi';

import PostSearch from '../components/PostSearch';
import PostTable from '../components/PostTable';

PostPage.propTypes = {};

function PostPage(props) {
    const [tabIndex, setTabIndex] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            var status_product = '';
            switch (tabIndex) {
                case 0:
                    status_product = 'disable';
                    break;
                case 1:
                    status_product = 'enable';
                    break;
                default:
                    return;
            }
            try {
                const products = await productApi.getAllProducts({
                    status: status_product,
                    _sort: 'createdAt:DESC',
                });

                setProducts(products.products);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [tabIndex]);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleDeletePost = async (value) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn từ chối duyệt bài viết này?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            try {
                const product = await productApi.deleteProduct(value._id);
                setProducts(products.filter((product) => product._id !== value._id));
                swal('Thành công!', 'Từ chối bài viết thành công!', 'success');
                sendNotification(
                    value.createdBy,
                    `Bài viết ${value.product_name} đã bị admin gỡ !`
                );
            } catch (err) {
                swal('Thất bại', `${err.message}!`, 'error');
            }
        }
    };
    const handleApprovePost = async (value) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn duyệt bài viết này?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            try {
                const product = await productApi.updateProduct(value._id, { status: 'enable' });

                setProducts(products.filter((product) => product._id !== value._id));
                swal('Thành công!', 'Bài viết đã được duyệt !', 'success');
                sendNotification(
                    value.createdBy,
                    `Bài viết ${value.product_name} đã được admin duyệt !`
                );
            } catch (err) {
                swal('Thất bại', `${err.message}!`, 'error');
            }
        }
    };

    return (
        <div className="post">
            <Box sx={{ width: '90%', margin: '0 auto' }}>
                <PostSearch />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}
                >
                    <Tabs value={tabIndex} onChange={handleChange}>
                        <Tab label="Chưa duyệt" value={0} />
                        <Tab label="Đã duyệt" value={1} />
                    </Tabs>
                </Box>
                <div>
                    <PostTable
                        tabIndex={tabIndex}
                        productsFilter={products}
                        onApprove={handleApprovePost}
                        onDelete={handleDeletePost}
                    />
                </div>
            </Box>
        </div>
    );
}

export default PostPage;
