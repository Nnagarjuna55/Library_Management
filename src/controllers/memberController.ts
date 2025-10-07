import { Request, Response } from 'express';
import { Member } from '../models/Member';
import { BorrowedBook } from '../models/BorrowedBook';
import { IMember, ApiResponse } from '../types';

export const addMember = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: userProvidedId, name, email } = req.body;

        const existingMember = await Member.findOne({ email });
        if (existingMember) {
            const response: ApiResponse = {
                success: false,
                message: 'Member with this email already exists'
            };
            res.status(400).json(response);
            return;
        }

        let id: number;
        if (userProvidedId && typeof userProvidedId === 'number') {
            const existingMemberWithId = await Member.findOne({ id: userProvidedId });
            if (existingMemberWithId) {
                const response: ApiResponse = {
                    success: false,
                    message: `Member with ID ${userProvidedId} already exists`
                };
                res.status(400).json(response);
                return;
            }
            id = userProvidedId;
        } else {
            const lastMember = await Member.findOne().sort({ id: -1 });
            id = lastMember ? lastMember.id + 1 : 1;
        }

        const member = new Member({
            id,
            name,
            email
        });

        await member.save();

        const memberData = member.toJSON();

        const responseData = {
            ...memberData,
            id: member.id
        };

        const response: ApiResponse<IMember> = {
            success: true,
            message: 'Member registered successfully',
            data: responseData
        };
        res.status(201).json(response);
    } catch (error: any) {
        if (error.code === 11000) {
            const response: ApiResponse = {
                success: false,
                message: 'Member with this email already exists'
            };
            res.status(400).json(response);
            return;
        }

        const response: ApiResponse = {
            success: false,
            message: 'Error registering member',
            error: error.message
        };
        res.status(500).json(response);
    }
};

export const getAllMembers = async (req: Request, res: Response): Promise<void> => {
    try {
        const members = await Member.find().sort({ createdAt: -1 });
        const response: ApiResponse<IMember[]> = {
            success: true,
            count: members.length,
            data: members
        };
        res.status(200).json(response);
    } catch (error: any) {
        const response: ApiResponse = {
            success: false,
            message: 'Error fetching members',
            error: error.message
        };
        res.status(500).json(response);
    }
};

export const getMemberById = async (req: Request, res: Response): Promise<void> => {
    try {
        const member = await Member.findOne({ id: parseInt(req.params.id) });

        if (!member) {
            const response: ApiResponse = {
                success: false,
                message: 'Member not found'
            };
            res.status(404).json(response);
            return;
        }

        const memberData = member.toJSON();

        const responseData = {
            ...memberData,
            id: member.id
        };

        const response: ApiResponse<IMember> = {
            success: true,
            data: responseData
        };
        res.status(200).json(response);
    } catch (error: any) {
        const response: ApiResponse = {
            success: false,
            message: 'Error fetching member',
            error: error.message
        };
        res.status(500).json(response);
    }
};

export const getMemberBorrowedBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const member = await Member.findOne({ id: parseInt(req.params.id) });
        if (!member) {
            const response: ApiResponse = {
                success: false,
                message: 'Member not found'
            };
            res.status(404).json(response);
            return;
        }

        const borrowedBooks = await BorrowedBook.find({
            member_id: parseInt(req.params.id),
            return_date: null
        })
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
            message: 'Error fetching member borrowed books',
            error: error.message
        };
        res.status(500).json(response);
    }
};
