import * as React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AcceptIcon from '../../../../../images/icon-svg/accept-icon.svg';
import CancelIcon from '../../../../../images/icon-svg/cancel-icon.svg';
import MessageOutLineIcon from '../../../../../images/icon-svg/message-outline-icon.svg';

import { formatPrice } from '../../../../utils';
import { formatTime } from '../../../../utils';

import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

TransactionTable.propTypes = {};

function TransactionTable({ user, tabIndex, transactions, productList, onCancel, onDone }) {
    const columns =
        tabIndex === 0
            ? [
                  { id: 'request_recipient', label: 'Người nhận yêu cầu', minWidth: 50 },
                  { id: 'product_id_requested', label: 'Đồ của người nhận', minWidth: 100 },
                  {
                      id: 'transaction_method_of_request_recipient',
                      label: 'Phương thức của người nhận',
                      minWidth: 120,
                      align: 'center',
                  },
                  { id: 'request_sender', label: 'Người gửi yêu cầu', minWidth: 50 },
                  { id: 'exchange_value', label: 'Đồ của người gửi', minWidth: 100 },
                  {
                      id: 'transaction_method_of_request_sender',
                      label: 'Phương thức của người gửi',
                      minWidth: 120,
                      align: 'center',
                  },
                  { id: 'updatedAt', label: 'Thời gian', minWidth: 50 },
                  {
                      id: 'operation',
                      label: 'Thao tác',
                      minWidth: 170,
                      align: 'center',
                  },
              ]
            : [
                  { id: 'request_recipient', label: 'Người nhận yêu cầu', minWidth: 50 },
                  { id: 'product_id_requested', label: 'Đồ của người nhận', minWidth: 100 },
                  { id: 'request_sender', label: 'Người gửi yêu cầu', minWidth: 50 },
                  { id: 'exchange_value', label: 'Đồ của người gửi', minWidth: 100 },
                  { id: 'updatedAt', label: 'Thời gian', minWidth: 50 },
              ];

    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //handleClickDone
    const handleClickDone = (e, transaction_id, product_id_requested, exchange_value, method) => {
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
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ minHeight: 350 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    sx={{
                                        textTransform: 'capitalize',
                                    }}
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                // mình là người nhận yêu cầu hay gửi yc
                                const isMe =
                                    user.username === row['request_recipient'] ? true : false;
                                const myMethod = isMe
                                    ? 'transaction_method_of_request_recipient'
                                    : 'transaction_method_of_request_sender';

                                const [method, setMethod] = React.useState(row[myMethod]);
                                //
                                const handleChangeMethod = (event) => {
                                    setMethod(event.target.value);
                                };

                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'request_recipient' &&
                                                        value === user.username &&
                                                        'Bạn'}
                                                    {column.id === 'request_recipient' &&
                                                        value !== user.username &&
                                                        value}
                                                    {column.id === 'request_sender' &&
                                                        value === user.username &&
                                                        'Bạn'}
                                                    {column.id === 'request_sender' &&
                                                        value !== user.username &&
                                                        value}

                                                    {column.id === 'product_id_requested' &&
                                                        productList.filter(
                                                            (product) => product._id === value
                                                        )[0].product_name}

                                                    {column.id === 'exchange_value' &&
                                                        value.length > 12 &&
                                                        productList.filter(
                                                            (product) => product._id === value
                                                        )[0].product_name}
                                                    {column.id === 'exchange_value' &&
                                                        value.length < 12 &&
                                                        formatPrice(value)}
                                                    {column.id === 'updatedAt' && formatTime(value)}

                                                    {/* transaction method  */}
                                                    {column.id ===
                                                        'transaction_method_of_request_recipient' &&
                                                        isMe && (
                                                            <FormControl fullWidth>
                                                                <InputLabel id="demo-simple-select-label">
                                                                    Phương thức
                                                                </InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={method}
                                                                    label="Phương thức"
                                                                    onChange={handleChangeMethod}
                                                                >
                                                                    <MenuItem value="free">
                                                                        Tự trao đổi
                                                                    </MenuItem>
                                                                    <MenuItem value="intermediary">
                                                                        Trung gian
                                                                    </MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        )}
                                                    {column.id ===
                                                        'transaction_method_of_request_recipient' &&
                                                        !isMe && (
                                                            <FormControl disabled fullWidth>
                                                                <InputLabel id="demo-simple-select-label">
                                                                    Phương thức
                                                                </InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={value}
                                                                    label="Phương thức"
                                                                >
                                                                    <MenuItem value="free">
                                                                        Tự trao đổi
                                                                    </MenuItem>
                                                                    <MenuItem value="intermediary">
                                                                        Trung gian
                                                                    </MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        )}

                                                    {column.id ===
                                                        'transaction_method_of_request_sender' &&
                                                        !isMe && (
                                                            <FormControl fullWidth>
                                                                <InputLabel id="demo-simple-select-label">
                                                                    Phương thức
                                                                </InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={method}
                                                                    label="Phương thức"
                                                                    onChange={handleChangeMethod}
                                                                >
                                                                    <MenuItem value="free">
                                                                        Tự trao đổi
                                                                    </MenuItem>
                                                                    <MenuItem value="intermediary">
                                                                        Trung gian
                                                                    </MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        )}
                                                    {column.id ===
                                                        'transaction_method_of_request_sender' &&
                                                        isMe && (
                                                            <FormControl disabled fullWidth>
                                                                <InputLabel id="demo-simple-select-label">
                                                                    Phương thức
                                                                </InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={value}
                                                                    label="Phương thức"
                                                                >
                                                                    <MenuItem value="free">
                                                                        Tự trao đổi
                                                                    </MenuItem>
                                                                    <MenuItem value="intermediary">
                                                                        Trung gian
                                                                    </MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        )}

                                                    {column.id === 'operation' && (
                                                        <>
                                                            <a href="#">
                                                                <img
                                                                    className="svg-icon"
                                                                    src={MessageOutLineIcon}
                                                                    alt="message-icon"
                                                                />
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
                                                                            row._id,
                                                                            row[
                                                                                'product_id_requested'
                                                                            ],
                                                                            row['exchange_value'],
                                                                            { [myMethod]: method }
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
                                                                            row[
                                                                                'request_recipient'
                                                                            ],
                                                                            row['request_sender'],
                                                                            row._id,
                                                                            row[
                                                                                'product_id_requested'
                                                                            ],
                                                                            row['exchange_value']
                                                                        )
                                                                    }
                                                                />
                                                            </a>
                                                            &nbsp;&nbsp;
                                                        </>
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[6, 12, 18]}
                component="div"
                count={transactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default TransactionTable;
