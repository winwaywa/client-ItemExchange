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

import PropTypes from 'prop-types';

TableApprove.propTypes = {};

function TableApprove({ tabIndex, productsFilter, transactions, onDelete }) {
    const columns =
        tabIndex === 2
            ? [
                  { id: 'product_name', label: 'Đồ của bạn', minWidth: 170 },
                  { id: 'with_name', label: 'Với ai', minWidth: 170 },
                  { id: 'with_product', label: 'Với gì', minWidth: 170 },
                  {
                      id: 'operation',
                      label: 'Thao tác',
                      minWidth: 170,
                      align: 'center',
                  },
              ]
            : [
                  { id: 'product_name', label: 'Đồ của bạn', minWidth: 170 },
                  { id: 'with_name', label: 'Với ai', minWidth: 170 },
                  { id: 'with_product', label: 'Với gì', minWidth: 170 },
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

    //handleClickDelete
    const handleClickDelete = (e, id) => {
        onDelete(id);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
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
                        {productsFilter
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                const transaction_detail = transactions.find(
                                    (transaction) =>
                                        transaction.product_id_requested === row._id ||
                                        transaction.exchange_value === row._id
                                );
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'product_name' && (
                                                        <Link to={`/products/${row._id}`}>
                                                            {value}
                                                        </Link>
                                                    )}

                                                    {/* hiện tên của người trao đổi */}
                                                    {transaction_detail &&
                                                        column.id === 'with_name' &&
                                                        transaction_detail.request_sender ===
                                                            me.username && (
                                                            <Link
                                                                to={`/user/${transaction_detail.request_recipient}`}
                                                            >
                                                                {
                                                                    transaction_detail.request_recipient
                                                                }
                                                            </Link>
                                                        )}
                                                    {transaction_detail &&
                                                        column.id === 'with_name' &&
                                                        transaction_detail.request_sender !==
                                                            me.username && (
                                                            <Link
                                                                to={`/user/${transaction_detail.request_sender}`}
                                                            >
                                                                {transaction_detail.request_sender}
                                                            </Link>
                                                        )}

                                                    {/* hiện đồ của người trao đổi bs mình */}
                                                    {transaction_detail &&
                                                        column.id === 'with_product' &&
                                                        transaction_detail.request_sender ===
                                                            me.username && (
                                                            <Link
                                                                to={`/products/${transaction_detail.product_id_requested}`}
                                                            >
                                                                {
                                                                    transaction_detail.product_id_requested
                                                                }
                                                            </Link>
                                                        )}
                                                    {transaction_detail &&
                                                        column.id === 'with_product' &&
                                                        transaction_detail.request_sender !==
                                                            me.username && (
                                                            <Link
                                                                to={`/products/${transaction_detail.exchange_value}`}
                                                            >
                                                                {transaction_detail.exchange_value}
                                                            </Link>
                                                        )}
                                                    {column.id === 'operation' && (
                                                        <>
                                                            <a href="#">Liên lạc</a>&nbsp;&nbsp;
                                                            <a href="#">Đã đổi</a>&nbsp;&nbsp;
                                                            <a href="#">Huỷ</a>&nbsp;&nbsp;
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
                count={productsFilter.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default TableApprove;
