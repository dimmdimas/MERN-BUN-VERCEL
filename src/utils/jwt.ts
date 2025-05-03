import jwt from 'jsonwebtoken'
import type { IUser } from '../models/user.models';
import type { Types } from 'mongoose';
import env from './env';

export interface IToken extends Omit<IUser, 'fullName' | 'username' | 'password' | 'confirmPassword' | 'profilePicture' | 'isActived' | 'codeActivation' | 'email'> {
    id?: Types.ObjectId
}

export function genereteToken(user: IToken):string {
    return jwt.sign(user, env.SECRET, {
        expiresIn: '1h'
    });
}

export function getUserData(token: string) {
    return jwt.verify(token, env.SECRET) as IToken
}