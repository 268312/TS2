import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './UserList.css';
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

interface User {
    id: number;
    name: string;
    email: string;
}

interface ApiResponse {
    success: boolean;
    data: User[];
    statusCode?: number;
}

export default function UserList() {
    const { t } = useTranslation();
    const apiClient = useApi();

    const [rows, setRows] = React.useState<User[]>([]);

    React.useEffect(() => {
        const getUsers = async () => {
            try {
                const response: ApiResponse = await apiClient.getUsers();
                console.log("Odpowiedź z serwera:", response); // Dodane logowanie odpowiedzi z serwera
                if (response.success && Array.isArray(response.data)) {
                    setRows(response.data);
                    console.log("Ustawieni użytkownicy:", response.data); // Dodane logowanie ustawionych danych
                } else {
                    console.error('Nie udało się pobrać danych o użytkownikach:', response.statusCode);
                }
            } catch (error) {
                console.error('Błąd podczas pobierania danych o użytkownikach:', error);
            }
        };

        getUsers(); // Wywołanie funkcji getUsers wewnątrz useEffect
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
                                <StyledTableCell align="right">{t('username')}</StyledTableCell>
                                <StyledTableCell align="right">{t('email')}</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}