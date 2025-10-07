import { Request, Response } from 'express';
import { Book } from '../models/Book';
import { BorrowedBook } from '../models/BorrowedBook';
import { IBook, ApiResponse } from '../types';

export const addBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: userProvidedId, title, author, category, total_copies } = req.body;

        let id: number;
        if (userProvidedId && typeof userProvidedId === 'number') {
            const existingBook = await Book.findOne({ id: userProvidedId });
            if (existingBook) {
                const response: ApiResponse = {
                    success: false,
                    message: `Book with ID ${userProvidedId} already exists`
                };
                res.status(400).json(response);
                return;
            }
            id = userProvidedId;
        } else {
            const lastBook = await Book.findOne().sort({ id: -1 });
            id = lastBook ? lastBook.id + 1 : 1;
        }

        const book = new Book({
            id,
            title,
            author,
            category,
            total_copies,
            available_copies: total_copies
        });

        await book.save();

        const responseData = {
            id: book.id,
            title: book.title,
            author: book.author,
            category: book.category,
            total_copies: book.total_copies,
            available_copies: book.available_copies
        };

        const response: ApiResponse<IBook> = {
            success: true,
            message: 'Book added successfully',
            data: responseData
        };
        res.status(201).json(response);
    } catch (error: any) {
        const response: ApiResponse = {
            success: false,
            message: 'Error adding book',
            error: error.message
        };
        res.status(500).json(response);
    }
};

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        const response: ApiResponse<IBook[]> = {
            success: true,
            count: books.length,
            data: books
        };
        res.status(200).json(response);
    } catch (error: any) {
        const response: ApiResponse = {
            success: false,
            message: 'Error fetching books',
            error: error.message
        };
        res.status(500).json(response);
    }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findOne({ id: parseInt(req.params.id) });

        if (!book) {
            const response: ApiResponse = {
                success: false,
                message: 'Book not found'
            };
            res.status(404).json(response);
            return;
        }

        const bookData = book.toJSON();

        // Ensure id is included in response
        const responseData = {
            ...bookData,
            id: book.id
        };

        const response: ApiResponse<IBook> = {
            success: true,
            data: responseData
        };
        res.status(200).json(response);
    } catch (error: any) {
        const response: ApiResponse = {
            success: false,
            message: 'Error fetching book',
            error: error.message
        };
        res.status(500).json(response);
    }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, author, category, total_copies } = req.body;

        const book = await Book.findOne({ id: parseInt(req.params.id) });
        if (!book) {
            const response: ApiResponse = {
                success: false,
                message: 'Book not found'
            };
            res.status(404).json(response);
            return;
        }

        const currentlyBorrowed = book.total_copies - book.available_copies;
        const newAvailableCopies = Math.max(0, total_copies - currentlyBorrowed);

        book.title = title;
        book.author = author;
        book.category = category;
        book.total_copies = total_copies;
        book.available_copies = newAvailableCopies;

        await book.save();

        const response: ApiResponse<IBook> = {
            success: true,
            message: 'Book updated successfully',
            data: book
        };
        res.status(200).json(response);
    } catch (error: any) {
        const response: ApiResponse = {
            success: false,
            message: 'Error updating book',
            error: error.message
        };
        res.status(500).json(response);
    }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findOne({ id: parseInt(req.params.id) });

        if (!book) {
            const response: ApiResponse = {
                success: false,
                message: 'Book not found'
            };
            res.status(404).json(response);
            return;
        }

        const borrowedCount = await BorrowedBook.countDocuments({
            book_id: parseInt(req.params.id),
            return_date: null
        });

        if (borrowedCount > 0) {
            const response: ApiResponse = {
                success: false,
                message: 'Cannot delete book that is currently borrowed'
            };
            res.status(400).json(response);
            return;
        }

        await Book.findOneAndDelete({ id: parseInt(req.params.id) });

        const response: ApiResponse = {
            success: true,
            message: 'Book deleted successfully'
        };
        res.status(200).json(response);
    } catch (error: any) {
        const response: ApiResponse = {
            success: false,
            message: 'Error deleting book',
            error: error.message
        };
        res.status(500).json(response);
    }
};

export const getBorrowedBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const borrowedBooks = await BorrowedBook.find({ return_date: null })
            .sort({ borrow_date: -1 });

        const response: ApiResponse = {
            success: true,
            count: borrowedBooks.length,
            data: borrowedBooks
        };
        res.status(200).json(response);
    } catch (error: any) {
        const response: ApiResponse = {
            success: false,
            message: 'Error fetching borrowed books',
            error: error.message
        };
        res.status(500).json(response);
    }
};
