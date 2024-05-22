import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './BooksList.css';
import CustomAppBar from '../app-bar/AppBar';
import {Box} from "@mui/material";



function createData(
    id: number,
    isbn: string,
    title: string,
    author: string,
    publisher: string,
    publishYear: number,
    availableCopies: number
) {
    return { id, isbn, title, author, publisher, publishYear, availableCopies };
}


const rows = [
    createData(1, "978-3-16-148410-0", "The Great Gatsby", "F. Scott Fitzgerald", "Scribner", 1925, 5),
    createData(2, "978-0-14-118776-1", "1984", "George Orwell", "Penguin Books", 1949, 8),
    createData(3, "978-0-7432-7356-5", "To Kill a Mockingbird", "Harper Lee", "J.B. Lippincott & Co.", 1960, 3),
    createData(4, "978-0-452-28423-4", "Pride and Prejudice", "Jane Austen", "Modern Library", 1813, 4),
    createData(5, "978-0-06-112008-4", "Brave New World", "Aldous Huxley", "Harper Perennial Modern Classics", 1932, 7),
    createData(6, "978-1-4767-4658-6", "The Catcher in the Rye", "J.D. Salinger", "Little, Brown and Company", 1951, 6),
    createData(7, "978-0-452-28425-8", "Moby-Dick", "Herman Melville", "Modern Library", 1851, 2),
    createData(8, "978-0-06-085052-4", "The Road", "Cormac McCarthy", "Alfred A. Knopf", 2006, 9),
    createData(9, "978-0-14-018639-0", "Animal Farm", "George Orwell", "Penguin Books", 1945, 10),
    createData(10, "978-0-375-50420-8", "The Grapes of Wrath", "John Steinbeck", "Viking Press", 1939, 1),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#F59AA5',
    color: theme.palette.common.white,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    fontWeight: 'bold',
    marginTop: 10
}));

export default function StickyHeaderTable() {
    return (
        <div>
            <CustomAppBar />
            <Box sx={{ marginTop: 8 }}>
            <TableContainer component={Paper} sx={{ maxHeight: 440, maxWidth: 800, marginTop: 10, margin: '0 auto' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="right">ISBN</StyledTableCell>
                            <StyledTableCell align="right">Title</StyledTableCell>
                            <StyledTableCell align="right">Author</StyledTableCell>
                            <StyledTableCell align="right">Publisher</StyledTableCell>
                            <StyledTableCell align="right">Publish Year</StyledTableCell>
                            <StyledTableCell align="right">Available Copies</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.isbn}</TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.author}</TableCell>
                                <TableCell align="right">{row.publisher}</TableCell>
                                <TableCell align="right">{row.publishYear}</TableCell>
                                <TableCell align="right">{row.availableCopies}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
        </div>
    );
}