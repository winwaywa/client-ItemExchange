import './styles.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

UserInfo.propTypes = {};

function UserInfo({ user, handleUpdateUser }) {
    const [avatar, setAvatar] = useState(user.avatar);
    const [fullName, setFullName] = useState(user.full_name);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);

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
            address,
        };
        handleUpdateUser(newData);
        console.log(newData);
    };

    return (
        <div>
            <h2 className="heading-tertiary">Thông tin cá nhân</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form__group">
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
                    <label htmlFor="address">Địa chỉ</label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Địa chỉ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <input className="btn btn--submit" type="submit" value="Cập nhật" />
            </form>
        </div>
    );
}

export default UserInfo;
