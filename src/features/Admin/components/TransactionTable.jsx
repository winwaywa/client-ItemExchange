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
import { formatTime, formatPrice } from '../../../utils';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

TransactionTable.propTypes = {};

function TransactionTable({ productsFilter, transactions, onDelete }) {
    const columns = [
        { id: 'request_recipient', label: 'Bên nhận yêu cầu', minWidth: 100 },
        { id: 'product_id_requested', label: '', minWidth: 150 },
        { id: 'request_sender', label: 'Bên gửi yêu cầu', minWidth: 100 },
        { id: 'exchange_value', label: '', minWidth: 150 },
        { id: 'updatedAt', label: 'Thời gian', minWidth: 100 },
        {
            id: 'transaction_method_of_request_recipient',
            label: 'Phương thức',
            minWidth: 100,
        },
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

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ minHeight: 350 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    sx={{
                                        fontSize: '1.4rem',
                                        fontWeight: 600,
                                        backgroundColor: 'var(--color-primary-light)',
                                        color: 'var(--color-grey-dark)',
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
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    sx={{
                                                        fontSize: '1.2rem',
                                                        fontWeight: 400,
                                                    }}
                                                >
                                                    {column.id === 'request_recipient' && (
                                                        <Link to={`/${value}`}>{value}</Link>
                                                    )}
                                                    {column.id === 'request_sender' && (
                                                        <Link to={`/${value}`}>{value}</Link>
                                                    )}
                                                    {column.id === 'product_id_requested' &&
                                                        productsFilter.filter(
                                                            (product) => product._id === value
                                                        )[0].product_name}
                                                    {column.id === 'exchange_value' &&
                                                        value.length > 12 &&
                                                        productsFilter.filter(
                                                            (product) => product._id === value
                                                        )[0].product_name}
                                                    {column.id === 'exchange_value' &&
                                                        value.length < 12 &&
                                                        formatPrice(value)}
                                                    {column.id === 'updatedAt' && formatTime(value)}
                                                    {/* phương thưc giao dịch */}
                                                    {column.id ===
                                                        'transaction_method_of_request_recipient' &&
                                                        value === 'free' &&
                                                        row[
                                                            'transaction_method_of_request_sender'
                                                        ] === 'free' &&
                                                        'Tự trao đổi'}
                                                    {column.id ===
                                                        'transaction_method_of_request_recipient' &&
                                                        value === 'intermediary' &&
                                                        row[
                                                            'transaction_method_of_request_sender'
                                                        ] === 'intermediary' &&
                                                        'Trung gian'}
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
