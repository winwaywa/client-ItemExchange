import './styles.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';

Header.propTypes = {};

function Header({ user, me, handleLogout, handleUpdateUser }) {
    const [avatar, setAvatar] = useState('');

    // Xử lý ảnh xem trước và set file để post lên server
    const handleAvatar = (e) => {
        const files = e.target.files;
        const preview = URL.createObjectURL(files[0]);
        setAvatar(preview);
        //update
        handleUpdateUser({ avatar: files[0] });
    };

    useEffect(() => {
        setAvatar(user.avatar);
    }, [user]);

    return (
        <section className="user__header">
            <div className="user__img-cover">
                <img src={user.avatar} alt="img-cover" />
                {user.username === me.username && (
                    <button className="btn btn--white">Thêm ảnh bìa</button>
                )}
            </div>
            <div className="user__details">
                {user.username !== me.username && (
                    <img className="user__avatar" src={user.avatar} />
                )}
                {user.username === me.username && (
                    <>
                        <label style={{ zIndex: 100 }} htmlFor="avatar">
                            <img className="user__avatar" src={avatar} alt="avatar" />
                        </label>

                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            onChange={(e) => handleAvatar(e)}
                        />
                    </>
                )}

                <h2 className="user__name">{user.full_name}</h2>
                {/* check để thay đổi button*/}
                {user.username === me.username && (
                    <div className="user__action">
                        <button className="btn btn--small btn--primary">Thêm bài viết</button>
                        <button className="btn btn--small btn--grey">
                            Chỉnh sửa trang cá nhân
                        </button>
                    </div>
                )}
                {user.username !== me.username && (
                    <div className="user__action">
                        <button className="btn btn--small btn--primary">Nhắn tin</button>
                    </div>
                )}
            </div>

            {/* check để thay đổi navbar*/}
            {user.username === me.username && <NavBar handleLogout={handleLogout} />}
        </section>
    );
}

export default Header;
