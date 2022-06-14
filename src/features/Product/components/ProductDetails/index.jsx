import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import userApi from '../../../../api/userApi';
import categoryApi from '../../../../api/categoryApi';
import ProductRequests from '../ProductRequests';
import ProductInfomation from '../ProductInfomation';
import CircularProgress from '@mui/material/CircularProgress';

ProductDetails.propTypes = {};

function ProductDetails({ product }) {
    const [value, setValue] = useState(0);
    const [user, setUser] = useState({});
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const user = await userApi.getUserByUserName(product.createdBy);
            const category = await categoryApi.getCategory(product.category_id);
            setUser(user.user);
            setCategoryName(category.category.category_name);
            setIsLoading(false);
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
                    </Tabs>
                </Box>
                {!isLoading && value === 0 && (
                    <ProductInfomation product={product} user={user} categoryName={categoryName} />
                )}
                {!isLoading && value === 1 && <ProductRequests product={product} />}

                {isLoading && (
                    <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </div>
    );
}

export default ProductDetails;
