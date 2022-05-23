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

UserTable.propTypes = {};

function UserTable({ userList = [] }) {
    const columns = [
        { id: 'avatar', label: 'Ảnh đại diện', minWidth: 50 },
        { id: 'username', label: 'username', minWidth: 100 },
        { id: 'full_name', label: 'Tên đầy đủ', minWidth: 100 },
        { id: 'address', label: 'Địa chỉ', minWidth: 170 },
        { id: 'province', label: 'Khu vực', minWidth: 100 },
        {
            id: 'operation',
            label: 'Thao tác',
            minWidth: 170,
            align: 'center',
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
                        {userList
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'username' && (
                                                        <Link to={`/products/${row._id}`}>
                                                            {value}
                                                        </Link>
                                                    )}
                                                    {column.id === 'avatar' && (
                                                        <img src={value} width="50" />
                                                    )}
                                                    {column.id === 'operation' && (
                                                        <>
                                                            <a href="#">Liên lạc</a>
                                                            &nbsp;&nbsp;
                                                            <a href="#">Phân quyền</a>&nbsp;&nbsp;
                                                            <a href="#">Khoá</a>
                                                        </>
                                                    )}
                                                    {column.id === 'username' ||
                                                        column.id === 'avatar' ||
                                                        value}
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
                count={userList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default UserTable;
