import mongoose, { Document, Schema } from 'mongoose';
import { IMember } from '../types';

export interface IMemberDocument extends IMember, Document { }

const memberSchema = new Schema<IMemberDocument>({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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

export const Member = mongoose.model<IMemberDocument>('Member', memberSchema);
