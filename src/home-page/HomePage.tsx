import {
    Box,
    Button,
    createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slider,
    TextField,
    ThemeProvider
} from "@mui/material";
import CustomAppBar from "../app-bar/AppBar";
import {useApi} from "../api/ApiProvider";
import {useTranslation} from "react-i18next";
import {useState} from "react";

function HomePage() {
    const apiClient = useApi();
    const { t } = useTranslation();
    const theme = createTheme({
        palette: {
            primary: {
                main: '#F59AA5',
            },
            secondary: {
                main: '#FFBAC0',
            },
            text: {
                primary: '#FFFFFF',
            },
        },
        typography: {
            fontFamily: 'Arial, sans-serif',
            fontSize: 16,
        },
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [openLoanDialog, setOpenLoanDialog] = useState(false);

    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        isbn: '',
        publishYear: 0,
        availableCopies: 0,
        publisher: ''
    });
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        fullName: '',
        role: 0
    });
    const [loanData, setLoanData] = useState({
        userId: 0,
        bookId: 0,
        loanDate: '',
        dueDate:'',
        returnDate: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBookData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSliderChange = (name: string) => (event: any, newValue: any) => {
        setBookData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleUserInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleLoanInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoanData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLoanSliderInputChange = (name: string) => (event: any, newValue: any) => {
        setLoanData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    apiClient.getBooks().then((response) => {
        console.log(response);
    });

    const handleAddUser = async () => {
        console.log("Dodaj użytkownika");
        try {
            const response = await apiClient.addUser(userData);
            console.log(response);
            setOpenUserDialog(false);

            setUserData({
                name: '',
                email: '',
                password: '',
                fullName: '',
                role: 0
            });
        } catch (error) {
            console.error("Błąd podczas dodawania użytkownika:", error);
        }
    };

    const handleAddBook = async () => {
        console.log("Przycisk został kliknięty");
        try {
            const response = await apiClient.addBook(bookData);
            console.log(response);
            setOpenDialog(false);

            setBookData({
                title: '',
                author: '',
                isbn: '',
                publishYear: 0,
                availableCopies: 0,
                publisher: ''
            });
        } catch (error) {
            console.error("Błąd podczas dodawania książki:", error);
        }
    };

    const handleAddLoan = async () => {
        console.log("Dodaj wypożyczenie");
        console.log(loanData);
        try {
            const response = await apiClient.addLoan(loanData);
            console.log(response);
            setOpenLoanDialog(false);

            setLoanData({
                userId: 1,
                bookId: 1,
                loanDate: '',
                dueDate: '',
                returnDate: ''
            });
        } catch (error) {
            console.error("Błąd podczas dodawania wypożyczenia:", error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <CustomAppBar/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh',
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpenUserDialog(true)}
                        sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF' }}
                    >
                        {t('add user')}
                    </Button>
                    <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
                        <DialogTitle>{t('Add New User')}</DialogTitle>
                        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <TextField
                                label={t('username')}
                                name="name"
                                value={userData.name}
                                onChange={handleUserInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('email')}
                                name="email"
                                value={userData.email}
                                onChange={handleUserInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('password')}
                                name="password"
                                value={userData.password}
                                onChange={handleUserInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('full name')}
                                name="fullName"
                                value={userData.fullName}
                                onChange={handleUserInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenUserDialog(false)}>{t('cancel')}</Button>
                            <Button onClick={handleAddUser} color="primary">{t('add')}</Button>
                        </DialogActions>
                    </Dialog>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpenDialog(true)}
                        sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF' }}
                    >
                        {t('add book')}
                    </Button>
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogTitle>{t('Add New Book')}</DialogTitle>
                        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <TextField
                                label={t('title')}
                                name='title'
                                value={bookData.title}
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('author')}
                                name='author'
                                value={bookData.author}
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('ISBN')}
                                name="isbn"
                                value={bookData.isbn}
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('publish year')}
                                name="publishYear"
                                type="number"
                                value={bookData.publishYear}
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <Slider
                                value={bookData.publishYear}
                                onChange={handleSliderChange('publishYear')}
                                min={0}
                                max={2024}
                                step={1}
                                valueLabelDisplay="auto"
                            />
                            <TextField
                                label={t('available copies')}
                                name="availableCopies"
                                type="number"
                                value={bookData.availableCopies}
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <Slider
                                value={bookData.availableCopies}
                                onChange={handleSliderChange('availableCopies')}
                                min={0}
                                max={100}
                                step={1}
                                valueLabelDisplay="auto"
                            />
                            <TextField
                                label={t('publisher')}
                                name="publisher"
                                value={bookData.publisher}
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialog(false)}>{t('cancel')}</Button>
                            <Button onClick={handleAddBook} color="primary">{t('add')}</Button>
                        </DialogActions>
                    </Dialog>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpenLoanDialog(true)}
                        sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF' }}
                    >
                        {t('add loan')}
                    </Button>
                    <Dialog open={openLoanDialog} onClose={() => setOpenLoanDialog(false)}>
                        <DialogTitle>{t('Add New Loan')}</DialogTitle>
                        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <TextField
                                label={t('user ID')}
                                name="userId"
                                type="number"
                                value={loanData.userId}
                                onChange={handleLoanInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <Slider
                                value={loanData.userId}
                                onChange={handleLoanSliderInputChange('userId')}
                                min={0}
                                max={1000}
                                step={1}
                                valueLabelDisplay="auto"
                            />
                            <TextField
                                label={t('book ID')}
                                name="bookId"
                                type="number"
                                value={loanData.bookId}
                                onChange={handleLoanInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <Slider
                                value={loanData.bookId}
                                onChange={handleLoanSliderInputChange('bookId')}
                                min={0}
                                max={1000}
                                step={1}
                                valueLabelDisplay="auto"
                            />
                            <TextField
                                label={t('loan date')}
                                name="loanDate"
                                type="date"
                                value={loanData.loanDate}
                                onChange={handleLoanInputChange}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('due date')}
                                name="dueDate"
                                type="date"
                                value={loanData.dueDate}
                                onChange={handleLoanInputChange}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ style: { color: 'black' } }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenLoanDialog(false)}>{t('cancel')}</Button>
                            <Button onClick={handleAddLoan} color="primary">{t('add')}</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default HomePage;
