import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
//mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import productApi from '../../../../api/productApi';

ProductRequests.propTypes = {};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ProductRequests({ user, product }) {
    const me = useSelector((state) => state.user.current);

    const [open, setOpen] = React.useState(false);
    const [products, setProducts] = React.useState();

    const handleClickOpen = async () => {
        try {
            setOpen(true);
            const products = await productApi.getProductsByUser();
            setProducts(products.products);
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async (product_id) => {
        const willDelete = await swal({
            title: 'Xác nhận',
            text: 'Bạn chắc chắn muốn đổi không?',
            icon: 'warning',
            dangerMode: true,
        });

        if (willDelete) {
            swal('Đã gửi!', 'Yêu cầu của bạn đã gửi thành công!', 'success');
            //Xử lý yêu cầu đổi
            console.log('Tôi:', me.username);
            console.log('Sản phẩm của tôi:', product_id);
            console.log(user.username);
            console.log(product._id);
        }
    };

    return (
        <div className="request">
            {user.username !== me.username && (
                <a href="#" className="btn-text u-margin-top-small" onClick={handleClickOpen}>
                    Gửi yêu cầu
                </a>
            )}
            <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
                <DialogTitle>{'Chọn một món đồ của bạn !'}</DialogTitle>
                <DialogContent>
                    {products &&
                        products.map((product) => (
                            <div styles={{ display: 'flex' }}>
                                <strong>{product.product_name}</strong>
                                <a
                                    href="#"
                                    className="btn-text"
                                    onClick={() => {
                                        handleClose();
                                        handleConfirm(product._id);
                                    }}
                                >
                                    Chọn
                                </a>
                            </div>
                        ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ProductRequests;
