import {Request, Response} from 'express';
import UserModel, { User } from '../models/user.model'
import { AuthRequest } from '../types/authRequest'
import bcrypt from "bcryptjs";
require('dotenv').config();

//@route GET /api/v1/status/profile
//@desc Get Data/Profile/Details of Logged-in user
//@access Private
export const userData = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({success: false, message: "Unauthorized"})
            return;
        }

        const user = await UserModel.findById(userId).select('-password -__v');
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "User profile fetched successfully.",
            data: user
        })


    } catch (error) {
        console.log({ message: "Error fetching user data", error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}

//@route GET /api/v1/status/users/:username
//@desc Get or View another user’s public profile
//@access Private
export const viewPublicProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const { username } = req.params;

        if(!username) {
            res.status(400).json({
                success: false,
                message: "Username is required"
            });
            return;
        }

        if (!userId) {
            res.status(401).json({success: false, message: "Unauthorized"})
            return;
        }

        const user = await UserModel.findOne({ userName: username }).select(
            'fullName userName yearGroup profession About profileImage backgroundImage affiliatedGroups ');
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        res.status(200).json(
            {
                success: true,
                message: "User profile fetched successfully.",
                data: user
            }
        );
        return;


    }catch (error) {
        console.log({ message: "Error viewing this user's profile", error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}


//@route PUT /api/v1/status/profile
//@desc Update Data/Profile/Details of Logged-in user
//@access Private
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({success: false, message: "Unauthorized"})
            return;
        }

        const { fullName, userName, yearGroup, occupation, About, profileImage, backgroundImage, affiliatedGroups } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        const updatedInfo = {
            fullName: fullName || user.fullName,
            userName: userName || user.userName,
            yearGroup: yearGroup || user.yearGroup,
            occupation: occupation || user.occupation,
            About: About || user.About,
            profileImage: profileImage || user.profileImage,
            backgroundImage: backgroundImage || user.profileImage,
            affiliatedGroups: affiliatedGroups || user.affiliatedGroups
        };

        await UserModel.findByIdAndUpdate(userId, updatedInfo, { new: true, runValidators: true });

        res.status(200).json({
            success: true,
            message: "User profile updated successfully.",
            data: updatedInfo
        });
        return;

    }catch (error) {
        console.log({ message: "Error viewing this user's profile", error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}


//@route PUT /api/v1/status/update/password
//@desc Update Data/Profile/Details of Logged-in user
//@access Private
export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({success: false, message: "Unauthorized"})
            return;
        }

        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            res.status(400).json({
                success: false,
                message: "Old password and new password are required"
            });
            return;
        }

        const user = await UserModel.findById(userId).select('+password');
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        if(!user.password) {
            res.status(400).json({
                success: false,
                message: "User does not have a password"
            });
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
        if (!isPasswordValid) {
            res.status(400).json({
                success: false,
                message: "Invalid old password"
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.passwordChangedAt = new Date();
        await UserModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true, runValidators: true });


        res.status(200).json({
            success: true,
            message: "Password updated successfully."
        });
        return;

    }catch (error) {
        console.log({ message: "Error changing password", error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}


//@route DELETE /api/v1/status/account/delete
//@desc Deactivate/Delete account (Soft Delete)
//@access Private
export const deleteAccount = async(req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({success: false, message: "Unauthorized"})
            return;
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        user.isAccountDeleted = true;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Account deleted successfully."
        });
        return;

    }catch (error) {
        console.log({ message: "Error deleting account", error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}