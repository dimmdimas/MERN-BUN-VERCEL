import type { NextFunction, Request, Response } from "express";
import type { IUser } from "../models/user.models";
import { getUserData, type IToken } from "../utils/jwt";

export interface IRequest extends Request {
    user?: IToken
}
export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = req.headers.authorization

        if (!auth) {
            res.status(403).json({
                massage: 'unauthorized',
                data: null
            });
        }

        if (auth) {
            const token = auth.split(' ')[1];

            if (!token) {
                res.status(403).json({
                    massage: 'unauthorized',
                    data: null
                });
            }

            if (token) {
                const user = getUserData(token);

                if (!user) {
                    res.status(403).json({
                        massage: 'unauthorized',
                        data: null
                    });
                }

                (req as IRequest).user = user;

                next();
            }
            
        }


    } catch (error) {
        const err = error as Error;

        res.status(400).json({
            message: err.message,
            data: null
        })
    }
};