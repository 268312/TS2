import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {LoginDto, LoginResponseDto} from "./dto/login.dto";
import {bookDataDto, bookResponseDto} from "./dto/bookData.dto";
import {userDataDto, userResponseDto} from "./dto/userData.dto";
import {loanDataDto, loanResponseDto} from "./dto/loanData.dto";
import {LoanToAddDataDto} from "./dto/LoanToAddData.dto";

export type ClientResponse<T> = {
    success: boolean,
    data: T,
    statusCode: number
}
export class LibraryClient {
    private client: AxiosInstance;

    constructor() {
        console.log('LibraryClient');
        this.client = axios.create({
            baseURL: 'http://localhost:8081',
        });
    }

    public async login(data: LoginDto): Promise<ClientResponse<LoginResponseDto | null>> {
        try{
            const response: AxiosResponse<LoginResponseDto> = await this.client.post('/auth/login', data);
            this.client.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            }
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async getBooks(): Promise<ClientResponse<any | null>> {
        try {
            console.log('ok1');
            const response = await this.client.get('/api/books/getAll');
            return {
                success: true,
                data: response.data,
                statusCode: 200,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async addBook(bookData: bookDataDto): Promise<ClientResponse<bookResponseDto | null>> {
        try {
            const response = await this.client.post('/api/books/add', bookData);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async getUsers(): Promise<ClientResponse<any | null>> {
        try {
            console.log('ok2');
            const response = await this.client.get('/api/user/getAll');
            return {
                success: true,
                data: response.data,
                statusCode: 200,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
            success: false,
            data: null,
            statusCode: axiosError.response?.status || 0
        };
}
}

    public async addUser(userData: userDataDto): Promise<ClientResponse<userResponseDto | null>> {
        try {
            const response = await this.client.post('/api/user/add', userData);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async addLoan(LoanToAddData: LoanToAddDataDto): Promise<ClientResponse<loanResponseDto | null>> {
        try {
            const response = await this.client.post('/api/loan/borrow', LoanToAddData);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }
    public async getLoans(): Promise<ClientResponse<loanResponseDto[] | null>> {
        try {
            const response = await this.client.get('/api/loan/all');
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }
    public async endLoan(loanId: number): Promise<ClientResponse<loanResponseDto | null>> {
        try {
            const response = await this.client.post('/api/loan/return/{id}', loanId);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }
}
