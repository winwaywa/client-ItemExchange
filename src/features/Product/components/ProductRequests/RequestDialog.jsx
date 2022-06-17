import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

//mui
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import ProductList from './ProductList';
import FormValue from './FormValue';

RequestDialog.propTypes = {};
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function RequestDialog({ open, product = {}, products = [], handleClose, handleConfirm }) {
    return (
        <div className="request__dialog">
            <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
                <DialogTitle>
                    <div className="notes info">
                        <strong>Chú ý : </strong>Chọn một món đồ hoặc nhập số tiền mà bạn muốn trao
                        đổi!
                    </div>
                </DialogTitle>
                <DialogContent>
                    {products.length > 0 ? (
                        <ProductList
                            products={products}
                            handleClose={handleClose}
                            handleConfirm={handleConfirm}
                        />
                    ) : (
                        'Bạn chưa đăng bất kì sản phẩm nào'
                    )}
                    <FormValue
                        product={product}
                        handleClose={handleClose}
                        handleConfirm={handleConfirm}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default RequestDialog;
