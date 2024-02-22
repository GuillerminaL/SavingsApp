import { Request, Response, NextFunction } from 'express';

import User from '../models/user';

type RequestBody = { name: string, email: string };
type RequestParams = { userId: string };

export function getUser(req:Request, res:Response, next: NextFunction) {
    const params = req.params as RequestParams;
    const userId = params.userId;
    User.findById(userId)
        .then(user => {
            if (user) {
                res.status(200).json({ user: user});
            } else {
                res.status(404).json({ message: `User id ${userId} not found`});
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export function addUser(req:Request, res:Response, next: NextFunction) {}

export function putUser(req:Request, res:Response, next: NextFunction) {}

export function removeUser(req:Request, res:Response, next: NextFunction) {}

