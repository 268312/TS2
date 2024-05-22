import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './LoansList.css';
import CustomAppBar from '../app-bar/AppBar';
import {Box} from "@mui/material";



function createData(
    loanID: number,
    userID: number,
    bookID: number,
    loanDate: string,
    dueDate: string,
    returnDate: string
) {
    return { loanID, userID, bookID, loanDate, dueDate, returnDate };
}


const rows = [
    createData(1, 101, 1001, "2024-01-15", "2024-02-15", "-"),
    createData(2, 102, 1002, "2024-01-20", "2024-02-20", "2024-02-18"),
    createData(3, 103, 1003, "2024-01-25", "2024-02-25", "-"),
    createData(4, 104, 1004, "2024-01-30", "2024-02-28", "2024-02-25"),
    createData(5, 105, 1005, "2024-02-01", "2024-03-01", "-"),
    createData(6, 106, 1006, "2024-02-05", "2024-03-05", "2024-03-03"),
    createData(7, 107, 1007, "2024-02-10", "2024-03-10", "2024-03-09"),
    createData(8, 108, 1008, "2024-02-12", "2024-03-12", "-"),
    createData(9, 109, 1009, "2024-02-15", "2024-03-15", "2024-03-14"),
    createData(10, 110, 1010, "2024-02-18", "2024-03-18", "-"),
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#F59AA5',
    color: theme.palette.common.white,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    fontWeight: 'bold',
}));

export default function StickyHeaderTable() {
    return (
        <div>
            <CustomAppBar />
            <Box sx={{ marginTop: 8 }}>
        <TableContainer component={Paper} sx={{ maxHeight: 440, maxWidth: 800, marginTop: 4, margin: '0 auto' }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Loan ID</StyledTableCell>
                        <StyledTableCell align="right">User ID</StyledTableCell>
                        <StyledTableCell align="right">Book ID</StyledTableCell>
                        <StyledTableCell align="right">Loan Date</StyledTableCell>
                        <StyledTableCell align="right">Due Date</StyledTableCell>
                        <StyledTableCell align="right">Return Date</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.loanID}>
                            <TableCell component="th" scope="row">
                                {row.loanID}
                            </TableCell>
                            <TableCell align="right">{row.userID}</TableCell>
                            <TableCell align="right">{row.bookID}</TableCell>
                            <TableCell align="right">{row.loanDate}</TableCell>
                            <TableCell align="right">{row.dueDate}</TableCell>
                            <TableCell align="right">{row.returnDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            </Box>
        </div>
    );
}