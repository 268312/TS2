import {
    Box,
    Button,
    createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Slider,
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
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        isbn: '',
        publishYear: 0,
        availableCopies: 0,
        publisher: ''
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

    apiClient.getBooks().then((response) => {
        console.log(response);
    });

    const handleAddUser = () => {
        console.log("Dodaj użytkownika");
        // add user
    };

    const handleAddBook = async () => {
        console.log("Przycisk został kliknięty");
        try {
            // api add book
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

    const handleAddLoan = () => {
        console.log("Dodaj wypożyczenie");
        // add loan
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
            onClick={handleAddUser}
            sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF' }}
            >
                {t('add user')}
        </Button>
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
        onClick={handleAddLoan}
        sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF' }}
    >
        {t('add loan')}
    </Button>
</Box>
        </div>
        </ThemeProvider>
    );
}

export default HomePage;