import {date} from "yup";

export class loanDataDto {
    bookID: number | undefined;
    userID: number | undefined;
    loanDate: string | undefined;
    dueDate: string | undefined;
    returnDate: string | undefined;
}

export class loanResponseDto {
    token: string | undefined;
}