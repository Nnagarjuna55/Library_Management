import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateBook = [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('total_copies').isInt({ min: 1 }).withMessage('Total copies must be a positive integer')
];

export const validateMember = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email address')
];

export const validateBorrowReturn = [
    body('member_id').isInt().withMessage('Member ID must be an integer'),
    body('book_id').isInt().withMessage('Book ID must be an integer')
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array()
        });
    }
    next();
};
