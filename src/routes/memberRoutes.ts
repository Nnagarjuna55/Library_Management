import { Router } from 'express';
import {
    getAllMembers,
    getMemberById,
    addMember,
    getMemberBorrowedBooks
} from '../controllers/memberController';
import { validateMember, handleValidationErrors } from '../middleware/validation';

const router = Router();

router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.get('/:id/borrowed', getMemberBorrowedBooks);
router.post('/', validateMember, handleValidationErrors, addMember);

export default router;
