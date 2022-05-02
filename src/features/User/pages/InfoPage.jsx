import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserInfo from '../components/UserInfo';

InfoPage.propTypes = {};

const data = {
  data: {
    username: 'hiep',
    avatar: 'https://gravatar.com/avatar/372107a8ffc361eb59f140a90081371a?s=200&d=robohash&r=x',
    first_name: 'Hiệp',
    last_name: 'Nguyễn Văn',
    phone: '090912323',
    address: 'Núi Thành, Quảng Nam',
  },
};

function InfoPage(props) {
  const [user, setUser] = useState(data.data);
  useEffect(() => {
    //call API lấy thông tin user
  }, []);

  const handleUpdateUser = (data) => {
    console.log(data);
    //Cập nhật dữ liệu
  };

  return (
    <div className="user__info">
      <UserInfo user={user} handleUpdateUser={handleUpdateUser} />
    </div>
  );
}

export default InfoPage;
