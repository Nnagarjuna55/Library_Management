export interface IBook {
    id: number;
    title: string;
    author: string;
    category: string;
    total_copies: number;
    available_copies: number;
}

export interface IMember {
    id: number;
    name: string;
    email: string;
}

export interface IBorrowedBook {
    id: number;
    book_id: number;
    member_id: number;
    borrow_date: Date;
    return_date?: Date;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    count?: number;
    error?: string;
    errors?: any[];
}

