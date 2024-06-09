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
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useApi } from "../api/ApiProvider";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#F59AA5',
    color: theme.palette.common.white,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    fontWeight: 'bold',
    marginTop: 10
}));

interface Book {
    id: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    publishYear: number;
    availableCopies: number;
}

export default function StickyHeaderTable() {
    const { t } = useTranslation();
    const apiClient = useApi();

    const [rows, setRows] = React.useState<Book[]>([]);

    React.useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await apiClient.getBooks();
                if (response.success) {
                    setRows(response.data as unknown as Book[]);
                } else {
                    console.error('Nie udało się pobrać danych o książkach:', response.statusCode);
                }
            } catch (error) {
                console.error('Błąd podczas pobierania danych o książkach:', error);
            }
        };

        getBooks();
    }, [apiClient]);

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