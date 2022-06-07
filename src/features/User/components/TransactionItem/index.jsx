import { useEffect, useState, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import AcceptIcon from '../../../../../images/icon-svg/accept-icon.svg';
import CancelIcon from '../../../../../images/icon-svg/cancel-icon.svg';
import MessageOutLineIcon from '../../../../../images/icon-svg/message-outline-icon.svg';
import DeliveryIcon from '../../../../../images/icon-svg/delivery-icon.svg';
//mui
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { formatPrice } from '../../../../utils';

import PropTypes from 'prop-types';
TransactionItem.propTypes = {};

function TransactionItem({ tabIndex, user, transaction, productList, onDone, onCancel }) {
    const { enqueueSnackbar } = useSnackbar();
    const [method, setMethod] = useState('');
    const [isRecipient, setIsRecipient] = useState();
    const [isDelivery, setIsDelivery] = useState(false);

    useEffect(() => {
        const isRecipient = user.username === transaction.request_recipient ? true : false;
        setIsRecipient(isRecipient);
        setMethod(
            isRecipient
                ? transaction.transaction_method_of_request_recipient
                : transaction.transaction_method_of_request_sender
        );
        const isShip =
            transaction.transaction_method_of_request_sender === 'intermediary' &&
            transaction.transaction_method_of_request_recipient === 'intermediary' &&
            true;
        setIsDelivery(isShip);
    }, [transaction]);

    const myMethod = useMemo(
        () =>
            isRecipient
                ? 'transaction_method_of_request_recipient'
                : 'transaction_method_of_request_sender',
        [isRecipient]
    );

    //find product name
    const findProductName = (product_id) => {
        return productList.filter((product) => product._id === product_id)[0].product_name;
    };

    //handleChangeMethod
    const handleChangeMethod = (event) => {
        setMethod(event.target.value);
    };

    //handleClickDone
    const handleClickDone = (e, transaction_id, product_id_requested, exchange_value, method) => {
        console.log(transaction);
        e.preventDefault();
        if (Object.values(method)[0] !== 'null') {
            onDone(transaction_id, product_id_requested, exchange_value, method);
        } else {
            enqueueSnackbar('Cần cung cấp phương thức giao dịch', { variant: 'error' });
        }
    };

    //handleClickCancel
    const handleClickCancel = (
        e,
        request_recipient,
        request_sender,
        transaction_id,
        product_id_requested,
        exchange_value
    ) => {
        e.preventDefault();
        onCancel(
            request_recipient,
            request_sender,
            transaction_id,
            product_id_requested,
            exchange_value
        );
    };

    return (
        <>
            <td>
                <p>
                    {isRecipient ? (
                        'Bạn'
                    ) : (
                        <Link to={`/${transaction.request_recipient}`}>
                            {transaction.request_recipient}
                        </Link>
                    )}
                </p>
                <p>
                    <Link to={`/products/${transaction.product_id_requested}`}>
                        {findProductName(transaction.product_id_requested)}
                    </Link>
                </p>
                {isRecipient && (
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Phương thức</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={method}
                            label="Phương thức"
                            onChange={handleChangeMethod}
                        >
                            <MenuItem value="free">Tự trao đổi</MenuItem>
                            <MenuItem value="intermediary">Trung gian</MenuItem>
                        </Select>
                    </FormControl>
                )}
                {!isRecipient && (
                    <FormControl disabled fullWidth>
                        <InputLabel id="demo-simple-select-label">Phương thức</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={transaction.transaction_method_of_request_recipient}
                            label="Phương thức"
                        >
                            <MenuItem value="free">Tự trao đổi</MenuItem>
                            <MenuItem value="intermediary">Trung gian</MenuItem>
                        </Select>
                    </FormControl>
                )}
            </td>
            <td>
                <p>
                    {isRecipient ? (
                        <Link to={`/${transaction.request_sender}`}>
                            {transaction.request_sender}
                        </Link>
                    ) : (
                        'Bạn'
                    )}
                </p>
                <p>
                    {transaction.exchange_value.length > 12 ? (
                        <Link to={`/products/${transaction.exchange_value}`}>
                            {findProductName(transaction.exchange_value)}
                        </Link>
                    ) : (
                        formatPrice(transaction.exchange_value)
                    )}
                </p>
                {!isRecipient && (
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Phương thức</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={method}
                            label="Phương thức"
                            onChange={handleChangeMethod}
                        >
                            <MenuItem value="free">Tự trao đổi</MenuItem>
                            <MenuItem value="intermediary">Trung gian</MenuItem>
                        </Select>
                    </FormControl>
                )}
                {isRecipient && (
                    <FormControl disabled fullWidth>
                        <InputLabel id="demo-simple-select-label">Phương thức</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={transaction.transaction_method_of_request_sender}
                            label="Phương thức"
                        >
                            <MenuItem value="free">Tự trao đổi</MenuItem>
                            <MenuItem value="intermediary">Trung gian</MenuItem>
                        </Select>
                    </FormControl>
                )}
            </td>
            {tabIndex === 0 && !isDelivery && (
                <td>
                    <a href="#">
                        <img className="svg-icon" src={MessageOutLineIcon} alt="message-icon" />
                    </a>
                    &nbsp;&nbsp;
                    <a href="#">
                        {' '}
                        <img
                            className="svg-icon"
                            src={AcceptIcon}
                            alt="message-icon"
                            onClick={(e) =>
                                handleClickDone(
                                    e,
                                    transaction._id,
                                    transaction.product_id_requested,
                                    transaction.exchange_value,
                                    {
                                        [myMethod]: method,
                                    }
                                )
                            }
                        />
                    </a>
                    &nbsp;&nbsp;
                    <a href="#">
                        {' '}
                        <img
                            className="svg-icon"
                            src={CancelIcon}
                            alt="message-icon"
                            onClick={(e) =>
                                handleClickCancel(
                                    e,
                                    transaction.request_recipient,
                                    transaction.request_sender,
                                    transaction._id,
                                    transaction.product_id_requested,
                                    transaction.exchange_value
                                )
                            }
                        />
                    </a>
                </td>
            )}

            {tabIndex === 0 && isDelivery && (
                <td>
                    <Link to={`/${user.username}/delivery`}>
                        <img className="svg-icon" src={DeliveryIcon} alt="message-icon" />
                    </Link>
                </td>
            )}
        </>
    );
}

export default TransactionItem;
