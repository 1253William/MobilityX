import mongoose, { Schema, Document, Model } from 'mongoose';

export type User = Document & {
    fullName: string;
    userName: string;
    email: string;
    password: string; // null for social logins
    googleId: String;    // if signed in with Google
    appleId: String;     // if signed in with Apple
    profileImage: String;
    backgroundImage: String;
    About: String;
    role: 'User' | 'Admin';
    following:  mongoose.Types.ObjectId[];
    followers:  mongoose.Types.ObjectId[];
    studentStatus: 'Alumni' | 'Non-Alumni';
    yearGroup: string;
    occupation: string;
    yearClass: string;
    residency: 'boarder' | 'non-boarder';
    hall: 'Alema/Michigan Hall' |'Peter Alan Adejetey Hall' | 'Ellen Hall' | 'Awuletey Hall' | 'Halm Addo Hall' | 'Nana Wereko Ampeng Hall' | 'NASH/GetFund Hall';
    affiliatedGroups: string[];
    posts: mongoose.Types.ObjectId;
    passwordChangedAt?: Date;
    isAccountDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema<User> = new Schema(
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
        profileImage: {
            type: String,
            default: 'https://res.cloudinary.com/dxfq3iotg/image/upload/v1646434233/user_profile/default_profile_image_q5j98z.png'
        },
        backgroundImage: {
            type: String,
            default: 'https://res.cloudinary.com/dxfq3iotg/image/upload/v1646434233/user_profile/default_profile_image_q5j98z.png'
        },
        About: {
            type: String,
            default: 'Write something about yourself here.'
        },
        role: {
            type: String,
            enum: ['User', 'Admin'],
            default: 'User',
        },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        studentStatus: {
            type: String,
            enum: ['Alumni', 'Non-Alumni'],
            default: 'Alumni',
            required: true,
        },
        yearGroup: {
            type: String,
            default: '2005',
        },
        occupation: {
            type: String,
            default: 'Professional Software Engineer',
        },
        yearClass: {
            type: String,
            default: '1 General Science',
        },
        residency:{
            type: String,
            enum: ['boarder', 'non-boarder'],
            default: 'boarder',
        },
        hall: {
            type: String,
            enum: [ 'Alema/Michigan Hall', 'Peter Alan Adejetey Hall' , 'Ellen Hall' , 'Awuletey Hall' , 'Halm Addo Hall' , 'Nana Wereko Ampeng Hall' , 'NASH/GetFund Hall'],
            default: 'Alema/Michigan Hall',
        },
        affiliatedGroups: {
            type: [String],
        },
        posts: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
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

const UserModel: Model<User> = mongoose.model<User>('User', UserSchema);

export default UserModel;