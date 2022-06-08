import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import PostForm from '../PostForm';

import categoryApi from '../../../../api/categoryApi';
import productApi from '../../../../api/productApi';

PostDialog.propTypes = {};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PostDialog({ handleClose }) {
    const [categories, setCategories] = useState([]);
    console.log('categories', categories);

    useEffect(() => {
        (async () => {
            try {
                const categories = await categoryApi.getAllCategory();
                setCategories(categories.categories);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
    const handleCreateProduct = async (values) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn đăng món đồ này?',
            icon: 'warning',
            dangerMode: true,
        });
        if (willDelete) {
            try {
                const product = await productApi.createProduct(values);
                if (!product) throw new Error('Đăng bài viết thất bại !');
                handleClose();
                swal(
                    'Đăng thành công!',
                    ' Người khác có thể nhìn thấy món đồ của bạn sau khi bài đăng được duyệt!',
                    'success'
                );
            } catch (err) {
                swal('Đăng thất bại!', `${err.message}`, 'error');
            }
        }
    };
    return (
        <Dialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                <h2 style={{ textAlign: 'center' }} className="heading-secondary">
                    Bài viết mới
                </h2>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <PostForm categories={categories} handleCreateProduct={handleCreateProduct} />
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default PostDialog;
