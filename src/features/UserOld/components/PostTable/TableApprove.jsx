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

import { useSelector } from 'react-redux';

import AcceptIcon from '../../../../../images/icon-svg/accept-icon.svg';
import CancelIcon from '../../../../../images/icon-svg/cancel-icon.svg';
import MessageOutLineIcon from '../../../../../images/icon-svg/message-outline-icon.svg';

import PropTypes from 'prop-types';

TableApprove.propTypes = {};

function TableApprove({ tabIndex, transactions, onCancel, onDone }) {
    const columns =
        tabIndex === 2
            ? [
                  { id: 'request_recipient', label: 'Người nhận', minWidth: 100 },
                  { id: 'product_id_requested', label: 'Của người nhận', minWidth: 150 },
                  { id: 'request_sender', label: 'Người gửi', minWidth: 100 },
                  { id: 'exchange_value', label: 'Của người gửi', minWidth: 150 },
                  { id: 'updatedAt', label: 'Thời gian', minWidth: 150 },
                  {
                      id: 'operation',
                      label: 'Thao tác',
                      minWidth: 170,
                      align: 'center',
                  },
              ]
            : [
                  { id: 'request_recipient', label: 'Người nhận', minWidth: 170 },
                  { id: 'product_id_requested', label: 'Của người nhận', minWidth: 170 },
                  { id: 'request_sender', label: 'Người gửi', minWidth: 170 },
                  { id: 'exchange_value', label: 'Của người gửi', minWidth: 170 },
                  { id: 'updatedAt', label: 'Thời gian', minWidth: 150 },
              ];

    const me = useSelector((state) => state.user.current);

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
    const handleClickDone = (transaction_id, product_id_requested, exchange_value) => {
        onDone(transaction_id, product_id_requested, exchange_value);
    };

    //handleClickCancel
    const handleClickCancel = (transaction_id, product_id_requested, exchange_value) => {
        onCancel(transaction_id, product_id_requested, exchange_value);
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
                                        textTransform: 'uppercase',
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
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value === me.username ? 'Bạn' : value}
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
                                                                    onClick={() =>
                                                                        handleClickDone(
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
                                                            <a href="#">
                                                                {' '}
                                                                <img
                                                                    className="svg-icon"
                                                                    src={CancelIcon}
                                                                    alt="message-icon"
                                                                    onClick={() =>
                                                                        handleClickCancel(
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

export default TableApprove;
