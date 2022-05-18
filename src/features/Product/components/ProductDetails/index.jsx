import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import userApi from '../../../../api/userApi';
import categoryApi from '../../../../api/categoryApi';
import ProductComments from '../ProductComments';
import ProductRequests from '../ProductRequests';
import ProductInfomation from '../ProductInfomation';

ProductDetails.propTypes = {};

function ProductDetails({ product }) {
    const [value, setValue] = useState(0);
    const [user, setUser] = useState({});
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        (async () => {
            const user = await userApi.getUserById(product.createdBy);
            const category = await categoryApi.getCategory(product.category_id);
            setUser(user.user);
            setCategoryName(category.category.category_name);
            setValue(0);
        })();
    }, [product]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="details">
            <Box sx={{ width: '90%', margin: '0 auto' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}
                >
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Thông tin" value={0} />
                        <Tab label="Yêu cầu" value={1} />
                        <Tab label="Bình luận" value={2} />
                    </Tabs>
                </Box>
                {value === 0 && (
                    <ProductInfomation product={product} user={user} categoryName={categoryName} />
                )}
                {value === 1 && <ProductRequests user={user} product={product} />}
                {value === 2 && <ProductComments />}
            </Box>
        </div>
    );
}

export default ProductDetails;
