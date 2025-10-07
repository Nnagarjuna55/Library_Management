import mongoose, { Document, Schema } from 'mongoose';
import { IBorrowedBook } from '../types';

export interface IBorrowedBookDocument extends IBorrowedBook, Document { }

const borrowedBookSchema = new Schema<IBorrowedBookDocument>({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    book_id: {
        type: Number,
        required: true
    },
    member_id: {
        type: Number,
        required: true
    },
    borrow_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    return_date: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = doc.id;
            return ret;
        }
    }
});

export const BorrowedBook = mongoose.model<IBorrowedBookDocument>('BorrowedBook', borrowedBookSchema);
