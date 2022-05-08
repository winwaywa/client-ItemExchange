import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserInfo from '../components/UserInfo';
import userApi from '../../../api/userApi';
import { useSnackbar } from 'notistack';
InfoPage.propTypes = {};

function InfoPage(props) {
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState();

    useEffect(() => {
        const getUser = async () => {
            //call API lấy thông tin user
            const data = await userApi.getUser();
            console.log(data.user);
            setUser(data.user);
        };
        getUser();
    }, []);

    const handleUpdateUser = async (data) => {
        try {
            const user = await userApi.updateUser(data);
            if (!user) {
                throw new Error('Cập nhật thất bại!');
            }
            enqueueSnackbar('Cập nhật thành công!', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar('Cập nhật thất bại!', { variant: 'error' });
        }
    };

    return (
        <div className="user__info">
            {user && <UserInfo user={user} handleUpdateUser={handleUpdateUser} />}
        </div>
    );
}

export default InfoPage;
