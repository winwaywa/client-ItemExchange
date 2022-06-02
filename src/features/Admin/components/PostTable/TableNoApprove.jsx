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

import AcceptIcon from '../../../../../images/icon-svg/accept-icon.svg';
import CancelIcon from '../../../../../images/icon-svg/cancel-icon.svg';
import DeleteIcon from '../../../../../images/icon-svg/delete-icon.svg';

import PropTypes from 'prop-types';

TableNoApprove.propTypes = {};

const columns = [
    { id: 'product_name', label: 'Bài viết', minWidth: 170 },
    {
        id: 'operation',
        label: 'Thao tác',
        minWidth: 170,
        align: 'center',
    },
];

function TableNoApprove({ tabIndex, productsFilter, onDelete, onApprove }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //handleClickApprove
    const handleClickApprove = (e, product) => {
        onApprove(product);
    };
    //handleClickDelete
    const handleClickDelete = (e, product) => {
        onDelete(product);
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
                        {productsFilter
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
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
                                                    {tabIndex === 0 && column.id === 'operation' && (
                                                        <>
                                                            <a
                                                                href="#"
                                                                onClick={(e) =>
                                                                    handleClickApprove(e, row)
                                                                }
                                                            >
                                                                <img
                                                                    className="svg-icon"
                                                                    src={AcceptIcon}
                                                                    alt="accept-icon"
                                                                />
                                                            </a>
                                                            &nbsp;&nbsp;
                                                            <a
                                                                href="#"
                                                                onClick={(e) =>
                                                                    handleClickDelete(e, row)
                                                                }
                                                            >
                                                                <img
                                                                    className="svg-icon"
                                                                    src={CancelIcon}
                                                                    alt="cancel-icon"
                                                                />
                                                            </a>
                                                        </>
                                                    )}
                                                    {tabIndex === 1 && column.id === 'operation' && (
                                                        <>
                                                            <a
                                                                href="#"
                                                                onClick={(e) =>
                                                                    handleClickDelete(e, row)
                                                                }
                                                            >
                                                                <img
                                                                    className="svg-icon"
                                                                    src={DeleteIcon}
                                                                    alt="delete-icon"
                                                                />
                                                            </a>
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

export default TableNoApprove;
