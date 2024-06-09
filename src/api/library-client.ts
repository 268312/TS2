import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {LoginDto, LoginResponseDto} from "./dto/login.dto";
import {bookDataDto, bookResponseDto} from "./dto/bookData.dto";
import {userDataDto, userResponseDto} from "./dto/userData.dto";

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
            baseURL: 'http://localhost:8081/api',
        });
    }

    // public async login(data: LoginDto): Promise<ClientResponse<LoginResponseDto | any>> {
    //     try{
    //         const response: AxiosResponse<LoginResponseDto> = await this.client.post('auth/login', data);
    //         this.client.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
    //         return {
    //             success: true,
    //             data: response.data,
    //             statusCode: response.status,
    //         }
    //     } catch (error) {
    //         const axiosError = error as AxiosError<Error>;
    //         return {
    //             success: false,
    //             data: null,
    //             statusCode: axiosError.response?.status || 0
    //         };
    //     }
    // }

    public async getBooks(): Promise<ClientResponse<any | null>>  {
        try {
            const response = await this.client.get('/books/getAll');
            return response.data;
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
            const response = await this.client.post('/books/add', bookData);
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

    public async addUser(userData: userDataDto): Promise<ClientResponse<userResponseDto | null>> {
        try {
            const response = await this.client.post('/user/add', userData);
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
