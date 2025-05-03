import type { Request, Response } from "express";
import * as yup from 'yup'
import userModels from "../models/user.models";
import encryption, { Vencryption } from "../utils/encryption";
import { genereteToken } from "../utils/jwt";
import type { IRequest } from "../middleware/auth.middleware";

export type TRegister = {
    fullName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
};

export type TLogin = {
    identifier: string,
    password: string
};

const RegisterVerify = yup.object<TRegister>({
    fullName: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], "password don`t match")
})

export default {
    Register: async (req: Request, res: Response) => {
        try {
            const { fullName, username, email, password, confirmPassword } = req.body as TRegister

            const result = await RegisterVerify.validate({
                fullName, username, email, password, confirmPassword
            })

            const user = await userModels.create(result);

            res.status(200).json({
                massage: 'succes',
                data: user
            })

        } catch (error) {
            const err = error as Error;

            res.status(400).json({
                massage: err.message,
                data: null
            })
        }
    },
    Login: async (req: IRequest, res: Response) => {
        const { identifier, password } = req.body as TLogin;


        try {
            const user = await userModels.findOne({
                $or: [
                    {
                        username: identifier
                    },
                    {
                        email: identifier
                    }
                ]
            })

            if (user) {
                const passV = await Vencryption(password, user.password);
                if (passV) {
                    const token = genereteToken({
                        role: user.role,
                        id: user.id
                     });

                    res.status(200).json({
                        massage: 'succes',
                        data: token
                    })
                }
                if (!passV) {
                    res.status(400).json({
                        massage: 'username / password salah',
                        data: null
                    })
                }
            }

            if (!user) {
                res.status(400).json({
                    massage: 'username / password salah',
                    data: null
                })
            }
        } catch (error) {
            const err = error as Error;

            res.status(400).json({
                message: err.message
            })
        }

    },
    Me: async (req: IRequest, res: Response) => {
        try {
            const user = req.user;

            const result = await userModels.findById(user?.id);

            res.status(200).json({
                message: 'Welcome',
                data: result
            })
        } catch (error) {
            const err = error as Error;

            res.status(400).json({
                message: err.message
            })
        }

    }
}