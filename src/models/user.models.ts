import mongoose from "mongoose";
import encryption from "../utils/encryption";

export interface IUser {
    fullName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string,
    profilePicture: string,
    isActived: boolean,
    codeActivation: string
}

const shema = mongoose.Schema


const userModels = new shema<IUser>({
    fullName: {
        type: shema.Types.String, 
        required: true
    },
    username: {
        type: shema.Types.String, 
        required: true
    },
    email: {
        type: shema.Types.String, 
        required: true
    },
    password: {
        type: shema.Types.String, 
        required: true
    },
    confirmPassword: {
        type: shema.Types.String, 
        required: true
    },
    role: {
        type: shema.Types.String, 
        enum: ['admin', 'user'],
        default: 'user'
    },
    profilePicture: {
        type: shema.Types.String, 
        default: 'users'
    },
    isActived: {
        type: shema.Types.Boolean, 
        default: false
    },
    codeActivation: {
        type: shema.Types.String,
    }
}, {
    timestamps: true
});

userModels.pre<IUser>('save', async function (next) {
    this.password = await encryption(this.password);
    this.confirmPassword = await encryption(this.confirmPassword);

    next();
})

export default mongoose.model('User', userModels);