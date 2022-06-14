import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import UserTable from '../components/UserTable';
import userApi from '../../../api/userApi';
import UserSearch from '../components/UserSearch';
UserPage.propTypes = {};

function UserPage(props) {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await userApi.getAllUsers();
            setUserList(data.users);
        })();
    }, []);

    return (
        <Box sx={{ width: '90%', margin: '0 auto' }}>
            <UserSearch />
            <UserTable userList={userList} />
        </Box>
    );
}

export default UserPage;
