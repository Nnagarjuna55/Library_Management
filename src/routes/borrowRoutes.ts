import { Router } from 'express';
import {
    borrowBook,
    returnBook,
    getOverdueBooks
} from '../controllers/borrowController';
import { validateBorrowReturn, handleValidationErrors } from '../middleware/validation';

const router = Router();

router.post('/borrow', validateBorrowReturn, handleValidationErrors, borrowBook);
router.post('/return', validateBorrowReturn, handleValidationErrors, returnBook);
router.get('/overdue', getOverdueBooks);

export default router;
