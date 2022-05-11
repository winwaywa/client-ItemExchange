import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
RequestAction.propTypes = {};

function RequestAction({ me, user, product, transactions, handleClickOpen }) {
    return (
        <div>
            {/* Chưa đăng nhập => thông báo cần đăng nhập */}
            {/* Đã đăng nhập và đã gửi yc=> thông báo chỉ đc 1 lần gửi */}
            {/* Đã đăng nhập chưa gửi yc=> hiện nút gửi */}
            {/* ngoài ra: đã đăng nhập nhưng là sp của mình=> tbao:Đây là sản phẩm của bạn */}
            {!me && (
                <>
                    <span>Vui lòng&nbsp;</span>
                    <Link to="/login">đăng nhập</Link>
                    <span>&nbsp;để có thể gửi yêu cầu trao đổi!</span>
                </>
            )}
            {me && user.username === me.username && 'Đây là sản phẩm của bạn'}
            {me &&
                user.username !== me.username &&
                transactions.findIndex(
                    (transaction) =>
                        transaction.product_id_requested === product._id &&
                        transaction.request_sender === me.username
                ) >= 0 &&
                'Mỗi sản phẩm bạn chỉ có thể gửi tối đa 1 yêu cầu !'}
            {me &&
                user.username !== me.username &&
                transactions.findIndex(
                    (transaction) =>
                        transaction.product_id_requested === product._id &&
                        transaction.request_sender === me.username
                ) < 0 && (
                    <a href="#" className="btn-text u-margin-top-small" onClick={handleClickOpen}>
                        Gửi yêu cầu
                    </a>
                )}
        </div>
    );
}

export default RequestAction;
