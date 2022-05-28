import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
// import { useDispatch } from 'react-redux';
import { updateUser } from '../../Auth/userSlice';

import AboutForm from '../components/AboutForm';
import userApi from '../../../api/userApi';
AboutPage.propTypes = {};

function AboutPage(props) {
    // const dispatch = useDispatch();
    const [user, setUser] = useState();
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                //call API lấy thông tin user
                const user = await userApi.getUser();
                console.log('Chưa khắc phục cái useEffect 2 lần(do IIFE)');
                setUser(user.user);

                //lấy ds tỉnh VN
                const url = 'https://provinces.open-api.vn/api/';
                const data = await axios.get(url);
                const provinces = data.data.map((province) => province.name);
                setProvinces(provinces);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleUpdateUser = async (data) => {
        console.log(data);
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn cập nhật thông tin của mình?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            try {
                const user = await userApi.updateUser(data);
                if (!user) {
                    throw new Error('Cập nhật thất bại!');
                }
                // //cập nhật user ở redux
                // const action = updateUser({
                //     username: user.user.username,
                //     avatar: user.user.avatar,
                // });
                // dispatch(action);
                swal('Thành công', 'Cập nhật thông tin thành công!', 'success');
            } catch (err) {
                swal('Thất bại', `${err.message}!`, 'error');
            }
        }
    };

    return (
        <>
            {user && (
                <AboutForm user={user} provinces={provinces} handleUpdateUser={handleUpdateUser} />
            )}
        </>
    );
}

export default AboutPage;
