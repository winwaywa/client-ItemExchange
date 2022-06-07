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
import BlockIcon from '../../../../../images/icon-svg/block-icon.svg';
import MessageOutLineIcon from '../../../../../images/icon-svg/message-outline-icon.svg';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

UserTable.propTypes = {};

function UserTable({ userList = [] }) {
    const columns = [
        { id: 'avatar', label: 'Ảnh đại diện', minWidth: 50 },
        { id: 'username', label: 'username', minWidth: 100 },
        // { id: 'full_name', label: 'Tên đầy đủ', minWidth: 100 },
        // { id: 'address', label: 'Địa chỉ', minWidth: 100 },
        // { id: 'province', label: 'Khu vực', minWidth: 100 },
        // { id: 'email', label: 'Email', minWidth: 100 },
        // { id: 'phone', label: 'SĐT', minWidth: 100 },
        { id: 'role', label: 'Vai trò', minWidth: 50 },
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
                                                        <Link to={`/${value}`}>{value}</Link>
                                                    )}
                                                    {column.id === 'avatar' && (
                                                        <img
                                                            style={{ borderRadius: '100%' }}
                                                            src={value}
                                                            width="50"
                                                        />
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
                                                                    src={EditIcon}
                                                                    alt="edit-icon"
                                                                />
                                                            </a>
                                                            &nbsp;&nbsp;
                                                            <a href="#">
                                                                {' '}
                                                                <img
                                                                    className="svg-icon"
                                                                    src={BlockIcon}
                                                                    alt="delete-icon"
                                                                />
                                                            </a>
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
