import './styles.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';

import PostDialog from '../PostDialog';
import CameraFillIcon from '../../../../../images/icon-svg/camera-fill-icon.svg';
import PlusFillIcon from '../../../../../images/icon-svg/plus-fill-icon.svg';
import MessageFillIcon from '../../../../../images/icon-svg/message-fill-icon.svg';

Header.propTypes = {};

function Header({ user, me, handleLogout, handleUpdateUser }) {
    const [avatar, setAvatar] = useState('');

    //dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setAvatar(user.avatar);
    }, [user]);

    // Xử lý ảnh xem trước và set file để post lên server
    const handleAvatar = async (e) => {
        const files = e.target.files;
        const preview = URL.createObjectURL(files[0]);
        // setAvatar(preview);
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn cập nhật thông tin của mình?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            //update
            handleUpdateUser({ file: files[0], url: preview });
        }
    };

    //

    return (
        <section className="user__header">
            <div className="user__img-cover">
                <img className="img-cover" src={user.avatar} alt="img-cover" />
                {user.username === me.username && (
                    <button className="btn btn--white btn--small">
                        <img className="svg-icon" src={CameraFillIcon} alt="camera-icon" />
                        <span>Thêm ảnh bìa</span>
                    </button>
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
                            <img className="icon--avatar" src={CameraFillIcon} alt="camera-icon" />
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
                        <button className="btn btn--small btn--primary" onClick={handleClickOpen}>
                            <img className="svg-icon" src={PlusFillIcon} alt="plus-icon" />
                            <span>Thêm bài viết</span>
                        </button>
                        {/* <button className="btn btn--small btn--grey">
                            Chỉnh sửa trang cá nhân
                        </button> */}
                    </div>
                )}
                {user.username !== me.username && (
                    <div className="user__action">
                        <button className="btn btn--small btn--primary">
                            <img className="svg-icon" src={MessageFillIcon} alt="message-icon" />
                            <span>Nhắn tin</span>
                        </button>
                    </div>
                )}
            </div>
            {/* check để thay đổi navbar*/}
            {user.username === me.username && <NavBar user={user} handleLogout={handleLogout} />}
            {/* dialog */}
            {open && <PostDialog handleClose={handleClose} />}
        </section>
    );
}

export default Header;
