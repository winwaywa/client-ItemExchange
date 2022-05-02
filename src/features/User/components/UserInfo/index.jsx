import './styles.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

UserInfo.propTypes = {};

function UserInfo({ user, handleUpdateUser }) {
  const [avatar, setAvatar] = useState(user.avatar);
  const [lastName, setLastName] = useState(user.last_name);
  const [firstName, setFirstName] = useState(user.first_name);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userNew = {
      avatar,
      lastName,
      firstName,
      phone,
      address,
    };
    handleUpdateUser(userNew);
  };

  return (
    <div>
      <h2 className="heading-tertiary">Thông tin cá nhân</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form__group">
          <label htmlFor="avatar">
            <img className="avatar" src={avatar} alt="avatar" />
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="last_name">Họ</label>
          <input
            id="last_name"
            type="text"
            placeholder="Họ"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="first_name">Tên</label>
          <input
            id="first_name"
            type="text"
            placeholder="Tên"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
