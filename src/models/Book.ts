import mongoose, { Document, Schema } from 'mongoose';
import { IBook } from '../types';

export interface IBookDocument extends IBook, Document { }

const bookSchema = new Schema<IBookDocument>({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    total_copies: {
        type: Number,
        required: true
    },
    available_copies: {
        type: Number,
        required: true
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

export const Book = mongoose.model<IBookDocument>('Book', bookSchema);
