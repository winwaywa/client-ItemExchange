import './styles.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

InfoForm.propTypes = {};

function InfoForm({ user, provinces, handleUpdateUser }) {
    const [avatar, setAvatar] = useState(user.avatar);
    const [fullName, setFullName] = useState(user.full_name);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [province, setProvince] = useState(user.province);

    const [previewAvatar, setPreviewAvatar] = useState('');

    // Xử lý ảnh xem trước và set file để post lên server
    const handleAvatar = (e) => {
        const files = e.target.files;
        const preview = URL.createObjectURL(files[0]);
        setPreviewAvatar(preview);
        setAvatar(files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            avatar,
            full_name: fullName,
            phone,
            email,
            address,
            province,
        };
        handleUpdateUser(newData);
        console.log(newData);
    };

    return (
        <div className="user__info">
            <h2 className="heading-secondary">Thông tin cá nhân</h2>
            <p style={{ textAlign: 'center' }}>Xin chào, {user.username}</p>
            <form className="user__form">
                <div className="form__avatar">
                    {!previewAvatar && (
                        <label htmlFor="avatar">
                            <img className="avatar" src={avatar} alt="avatar" />
                        </label>
                    )}
                    {previewAvatar && (
                        <label htmlFor="avatar">
                            <img className="avatar" src={previewAvatar} alt="preview avatar" />
                        </label>
                    )}
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={(e) => handleAvatar(e)}
                    />
                </div>
                <div>
                    <div className="form__group">
                        <label htmlFor="full_name">Họ Tên</label>
                        <input
                            id="full_name"
                            type="text"
                            placeholder="Họ Tên"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                            id="phone"
                            type="text"
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="address">Địa chỉ</label>
                        <input
                            id="address"
                            type="text"
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            style={{
                                display: 'inline-block',
                                minWidth: '10rem',
                                textAlign: 'left',
                                fontSize: '1.6rem',
                            }}
                            htmlFor=""
                        >
                            Khu vực
                        </label>
                        <Autocomplete
                            disablePortal
                            id="combo-box-provinces"
                            options={provinces}
                            sx={{
                                width: '20rem',
                                margin: '0 auto',
                                marginBottom: '1.5rem',
                                display: 'inline-block',
                            }}
                            renderInput={(params) => <TextField {...params} label={province} />}
                            onChange={(e, newValue) => {
                                setProvince(newValue);
                            }}
                        />
                    </div>
                    <button
                        className="btn btn--primary btn--small"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Cập nhật
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InfoForm;
