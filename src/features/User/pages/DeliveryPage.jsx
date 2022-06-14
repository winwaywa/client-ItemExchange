import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import deliveryApi from '../../../api/deliveryApi';
// import transactionApi from '../../../api/transactionApi';
// import { useSelector } from 'react-redux';

DeliveryPage.propTypes = {};

function DeliveryPage(props) {
    // const me = useSelector((state) => state.user.current);
    const [tabIndex, setTabIndex] = useState(0);
    // const [deliveryList, setDeliveryList] = useState([]);
    // const [transactionList, setTransactionList] = useState([]);

    // useEffect(() => {
    //     (async () => {
    //         const { delivery } = await deliveryApi.getAllDelivery();
    //         const { transactions } = await transactionApi.getTransactionsWithCondition({
    //             status: 'approved',
    //         });
    //         const myTrasaction = transactions.filter(
    //             (transaction) =>
    //                 (transaction.transaction_method_of_request_recipient === 'intermediary' &&
    //                     transaction.transaction_method_of_request_sender === 'intermediary' &&
    //                     transaction.request_recipient === me.username) ||
    //                 transaction.request_sender === me.username
    //         );
    //         setDeliveryList(delivery);
    //         setTransactionList(myTrasaction);
    //     })();
    // }, []);

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
