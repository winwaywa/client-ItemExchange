import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RequestList from '../components/RequestList';
import transactionApi from '../../../api/transactionApi';

RequestPage.propTypes = {};

function RequestPage(props) {
    const [tabIndex, setTabIndex] = useState(0);
    const [transactions, setTransactions] = useState();

    useEffect(() => {
        (async () => {
            const transactions = await transactionApi.getTransactionsWithCondition({
                status: 'pending',
            });
            setTransactions(transactions.transactions);
        })();
    }, []);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <div className="user__request request">
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
                    <Tabs value={tabIndex} onChange={handleChange}>
                        <Tab value={0} label="Yêu cầu của bạn" />
                        <Tab value={1} label="Người khác muốn đổi với bạn" />
                    </Tabs>
                </Box>
                {transactions && <RequestList tabIndex={tabIndex} transactions={transactions} />}
            </Box>
        </div>
    );
}
export default RequestPage;
