import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

DeliveryPage.propTypes = {};

function DeliveryPage(props) {
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {}, []);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <div className="user__request">
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Tabs value={tabIndex} onChange={handleChange}>
                    <Tab value={0} label="Chờ xác nhận" />
                    <Tab value={1} label="Chờ lấy hàng" />
                    <Tab value={2} label="Đang giao" />
                    <Tab value={3} label="Đã giao" />
                    <Tab value={4} label="Đã huỷ" />
                </Tabs>
            </Box>
        </div>
    );
}
export default DeliveryPage;
