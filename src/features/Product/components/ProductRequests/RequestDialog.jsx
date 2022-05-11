import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

//mui
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import ListItem from './ListItem';
import FormValue from './FormValue';

RequestDialog.propTypes = {};
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function RequestDialog({ open, products, handleClose, handleConfirm }) {
    return (
        <div>
            <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
                <DialogTitle>
                    <strong>{'Chọn một món đồ hoặc nhập số tiền mà bạn muốn trao đổi!'}</strong>
                </DialogTitle>
                <DialogContent>
                    <ListItem
                        products={products}
                        handleClose={handleClose}
                        handleConfirm={handleConfirm}
                    />
                    <FormValue handleClose={handleClose} handleConfirm={handleConfirm} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default RequestDialog;
