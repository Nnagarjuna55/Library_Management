import { Request, Response } from 'express';
import { Book } from '../models/Book';
import { Member } from '../models/Member';
import { BorrowedBook } from '../models/BorrowedBook';
import { ApiResponse } from '../types';

export const borrowBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: userProvidedId, member_id, book_id } = req.body;

        const member = await Member.findOne({ id: member_id });
        if (!member) {
            const response: ApiResponse = {
                success: false,
                message: 'Member not found'
            };
            res.status(404).json(response);
            return;
        }

        const book = await Book.findOne({ id: book_id });
        if (!book) {
            const response: ApiResponse = {
                success: false,
                message: 'Book not found'
            };
            res.status(404).json(response);
            return;
        }

        if (book.available_copies <= 0) {
            const response: ApiResponse = {
                success: false,
                message: 'Book is not available for borrowing'
            };
            res.status(400).json(response);
            return;
        }

        const existingBorrow = await BorrowedBook.findOne({
            member_id,
            book_id,
            return_date: null
        });

        if (existingBorrow) {
            const response: ApiResponse = {
                success: false,
                message: 'Member has already borrowed this book'
            };
            res.status(400).json(response);
            return;
        }

        let id: number;
        if (userProvidedId && typeof userProvidedId === 'number') {
            const existingBorrowedBook = await BorrowedBook.findOne({ id: userProvidedId });
            if (existingBorrowedBook) {
                const response: ApiResponse = {
                    success: false,
                    message: `Borrowed book with ID ${userProvidedId} already exists`
                };
                res.status(400).json(response);
                return;
            }
            id = userProvidedId;
        } else {
            const lastBorrowedBook = await BorrowedBook.findOne().sort({ id: -1 });
            id = lastBorrowedBook ? lastBorrowedBook.id + 1 : 1;
        }

        const borrowedBook = new BorrowedBook({
            id,
            member_id,
            book_id,
            borrow_date: new Date()
        });

        await borrowedBook.save();

        book.available_copies -= 1;
        await book.save();

        const borrowedBookData = borrowedBook.toJSON();

        const response: ApiResponse = {
            success: true,
            message: 'Book borrowed successfully',
            data: borrowedBookData
        };
        res.status(201).json(response);
    } catch (error: any) {
        const response: ApiResponse = {
            success: false,
            message: 'Error borrowing book',
            error: error.message
        };
        res.status(500).json(response);
    }
};

export const returnBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { member_id, book_id } = req.body;

        const borrowedBook = await BorrowedBook.findOne({
            member_id,
            book_id,
            return_date: null
        });

        if (!borrowedBook) {
            const response: ApiResponse = {
                success: false,
                message: 'No active borrow record found for this member and book'
            };
            res.status(404).json(response);
            return;
        }

        borrowedBook.return_date = new Date();
        await borrowedBook.save();

        const book = await Book.findOne({ id: book_id });
        if (book) {
            book.available_copies += 1;
            await book.save();
        }

        const borrowedBookData = borrowedBook.toJSON();

        const response: ApiResponse = {
            success: true,
            message: 'Book returned successfully',
            data: borrowedBookData
        };
        res.status(200).json(response);
    } catch (error: any) {
        const response: ApiResponse = {
            success: false,
            message: 'Error returning book',
            error: error.message
        };
        res.status(500).json(response);
    }
};

export const getOverdueBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const currentDate = new Date();
        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(currentDate.getDate() - 14);

        const overdueBooks = await BorrowedBook.find({
            return_date: null,
            borrow_date: { $lt: fourteenDaysAgo }
        })
            .sort({ borrow_date: 1 });

        const response: ApiResponse = {
            success: true,
            count: overdueBooks.length,
            data: overdueBooks
        };
        res.status(200).json(response);
    } catch (error: any) {
        const response: ApiResponse = {
            success: false,
            message: 'Error fetching overdue books',
            error: error.message
        };
        res.status(500).json(response);
    }
};
