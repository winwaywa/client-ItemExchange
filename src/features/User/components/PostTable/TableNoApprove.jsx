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

import EditIcon from '../../../../../images/icon-svg/edit-icon.svg';
import DeleteIcon from '../../../../../images/icon-svg/delete-icon.svg';

import PropTypes from 'prop-types';

TableNoApprove.propTypes = {};

function TableNoApprove({ tabIndex, productsFilter, onDelete }) {
    const columns =
        tabIndex === 0
            ? [
                  { id: 'product_name', label: 'Đồ của bạn', minWidth: 170 },
                  { id: 'updatedAt', label: 'Thời gian đăng', minWidth: 100 },
                  {
                      id: 'operation',
                      label: 'Thao tác',
                      minWidth: 170,
                      align: 'center',
                  },
              ]
            : [
                  { id: 'product_name', label: 'Đồ của bạn', minWidth: 170 },
                  { id: 'updatedAt', label: 'Thời gian duyệt', minWidth: 100 },
                  {
                      id: 'operation',
                      label: 'Thao tác',
                      minWidth: 170,
                      align: 'center',
                  },
              ];
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
                                                    {column.id === 'updatedAt' && value}
                                                    {column.id === 'operation' && (
                                                        <>
                                                            <a href="#">
                                                                <img
                                                                    className="svg-icon"
                                                                    src={EditIcon}
                                                                    alt="edit-icon"
                                                                />
                                                            </a>
                                                            &nbsp;&nbsp;
                                                            <a
                                                                href="#"
                                                                onClick={(e) =>
                                                                    handleClickDelete(e, row._id)
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
