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
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useApi } from "../api/ApiProvider";
import { loanDataDto } from "../api/dto/loanData.dto";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#F59AA5',
    color: theme.palette.common.white,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    fontWeight: 'bold',
}));

interface Loan {
    loanID: number;
    userID: number;
    bookID: number;
    loanDate: string;
    dueDate: string;
    returnDate: string;
}

export default function StickyHeaderTable() {
    const { t } = useTranslation();
    const apiClient = useApi();

    const [rows, setRows] = React.useState<Loan[]>([]);

    React.useEffect(() => {
        const getLoans = async () => {
            try {
                const response = await apiClient.getLoans();
                if (response.success) {
                    console.log(response.data);
                    setRows(response.data as unknown as Loan[]);
                } else {
                    console.error('Nie udało się pobrać danych o wypożyczeniach:', response.statusCode);
                }
            } catch (error) {
                console.error('Błąd podczas pobierania danych o wypożyczeniach:', error);
            }
        };

        getLoans();
    }, [apiClient]);

    return (
        <div>
            <CustomAppBar />
            <Box sx={{ marginTop: 8 }}>
                <TableContainer component={Paper} sx={{ maxHeight: 440, maxWidth: 800, marginTop: 4, margin: '0 auto' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>{t('loan id')}</StyledTableCell>
                                <StyledTableCell align="right">{t('user ID')}</StyledTableCell>
                                <StyledTableCell align="right">{t('book ID')}</StyledTableCell>
                                <StyledTableCell align="right">{t('loan date')}</StyledTableCell>
                                <StyledTableCell align="right">{t('due date')}</StyledTableCell>
                                <StyledTableCell align="right">{t('return date')}</StyledTableCell>
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
