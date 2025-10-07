import { Router } from 'express';
import {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    getBorrowedBooks
} from '../controllers/bookController';
import { validateBook, handleValidationErrors } from '../middleware/validation';

const router = Router();

router.get('/', getAllBooks);
router.get('/borrowed', getBorrowedBooks);
router.get('/:id', getBookById);
router.post('/', validateBook, handleValidationErrors, addBook);
router.put('/:id', validateBook, handleValidationErrors, updateBook);
router.delete('/:id', deleteBook);

export default router;
