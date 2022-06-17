import './styles.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';
import transactionApi from '../../../../api/transactionApi';
import PostDialog from '../PostDialog';
import CameraFillIcon from '../../../../../images/icon-svg/camera-fill-icon.svg';
import PlusFillIcon from '../../../../../images/icon-svg/plus-fill-icon.svg';
import MessageFillIcon from '../../../../../images/icon-svg/message-fill-icon.svg';

Header.propTypes = {};

function Header({ user, me, handleLogout, handleUpdateAvatar }) {
    const [avatar, setAvatar] = useState(user?.avatar);
    const [transactionCancelled, setTransactionCancelled] = useState(0);
    const [transactionCompleted, setTransactionCompleted] = useState(0);
    const [isExchanging, setIsExchanging] = useState(false);

    useEffect(() => {
        (async () => {
            const { transactions } = await transactionApi.getTransactionsWithCondition({
                status: ['cancelled', 'approved', 'completed'],
            });
            //lọc
            const myTransaction = transactions.filter(
                (transaction) =>
                    user.username === transaction.request_sender ||
                    user.username === transaction.request_recipient
            );
            console.log(myTransaction);

            const transactionCancelled = myTransaction.filter(
                (transaction) => transaction.status === 'cancelled'
            );
            console.log(transactionCancelled);
            setTransactionCancelled(transactionCancelled.length);

            const transactionCompleted = myTransaction.filter(
                (transaction) => transaction.status === 'completed'
            );
            console.log(transactionCompleted);

            //xem người này có đang giao dịch với mình ko để hiện nút nhắn tin
            const isTransaction = transactions.filter(
                (transaction) =>
                    transaction.status === 'approved' &&
                    (transaction.request_recipient === user.username ||
                        transaction.request_sender === user.username) &&
                    (transaction.request_recipient === me.username ||
                        transaction.request_sender === me.username)
            );
            console.log('Dang co giao dich:', isTransaction);
            setIsExchanging(isTransaction.length === 0 ? false : true);

            setTransactionCompleted(transactionCompleted.length);
        })();

        setAvatar(user.avatar);
    }, [user]);

    //dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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
            handleUpdateAvatar({ file: files[0], url: preview });
        }
    };

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
                <div className="user__text">
                    <h2 style={{ textAlign: 'center' }}>{user.full_name}</h2>
                    <p>
                        Đã huỷ: <span>{transactionCancelled}</span>&nbsp;-&nbsp; Đã hoàn thành:{' '}
                        <span>{transactionCompleted}</span>
                    </p>
                    <p>
                        Tỉ lệ thành công:{' '}
                        <span>
                            {(
                                (transactionCompleted /
                                    (transactionCompleted + transactionCancelled || 1)) *
                                100
                            ).toFixed(2)}
                            %
                        </span>
                    </p>
                </div>

                {/* check để thay đổi button*/}
                {user.username === me.username && (
                    <div className="user__action">
                        <button className="btn btn--small btn--primary" onClick={handleClickOpen}>
                            <img className="svg-icon" src={PlusFillIcon} alt="plus-icon" />
                            <span>Thêm bài viết</span>
                        </button>
                    </div>
                )}
                {user.username !== me.username && isExchanging && (
                    <div className="user__action">
                        <Link style={{ color: '#fff' }} to={`/message`}>
                            <button className="btn btn--small btn--primary">
                                <img
                                    className="svg-icon"
                                    src={MessageFillIcon}
                                    alt="message-icon"
                                />
                                <span>Nhắn tin</span>
                            </button>
                        </Link>
                    </div>
                )}
                {user.username !== me.username && !isExchanging && (
                    <div className="user__action"></div>
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
