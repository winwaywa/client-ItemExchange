import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
//mui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import ProductApi from '../../../api/productApi';
import CategoryApi from '../../../api/categoryApi';

import PostList from '../components/PostList';
import NewPostForm from '../components/NewPostForm';

PostPage.propTypes = {};

function PostPage(props) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [value, setValue] = useState(4);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const products = await ProductApi.getProductsByUser();
                const categories = await CategoryApi.getAllCategory();
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
        try {
            console.log(values);
            const product = await ProductApi.createProduct(values);
            console.log(product);
            navigate(`/products/${product.product._id}`);
            enqueueSnackbar('Đăng sản phẩm thành công', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar(err.message, { variant: 'error' });
            console.log(err);
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
                        <Tab label="Mới" value={0} />
                        <Tab label="Đang gửi yêu cầu" value={1} />
                        <Tab label="Đang trao đổi" value={2} />
                        <Tab label="Đã đổi thành công" value={3} />
                        <Tab label="Thêm sản phẩm" value={4} />
                    </Tabs>
                </Box>
                {value === 4 || <PostList products={products} tabIndex={value} />}
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
