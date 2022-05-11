import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
//mui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import productApi from '../../../api/productApi';
import categoryApi from '../../../api/categoryApi';

import PostList from '../components/PostList';
import NewPostForm from '../components/NewPostForm';

PostPage.propTypes = {};

function PostPage(props) {
    const [value, setValue] = useState(4);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                console.log('alo');
                const products = await productApi.getProductsByUser();
                const categories = await categoryApi.getAllCategory();
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
                console.log(values);
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
                swal('Đã xoá!', 'Xoá sản phẩm thành công', 'success');
            } catch (err) {
                swal('Xoá thất bại!', `${err.message}`, 'error');
            }
        }
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
                        tabIndex={value}
                        handleDeleteProduct={handleDeleteProduct}
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
