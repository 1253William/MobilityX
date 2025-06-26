import { Schema, Document, model } from 'mongoose';
import {UserRole} from "../types/authRequest";


export interface IUser extends Document {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    role: UserRole;
    passwordChangedAt?: Date;
    isAccountDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minlength: [8, 'Password must be at least 8 characters long'],
            select: false,
        },
        role: {
            type: String,
            enum: ['rider', 'driver'],
            default: 'rider',
        },
        passwordChangedAt: {
            type: Date,
        },
        isAccountDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

export const User = model<IUser>('User', UserSchema);

