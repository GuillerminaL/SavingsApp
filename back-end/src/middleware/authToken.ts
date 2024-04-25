import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function authToken(req:Request, res:Response, next: NextFunction) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if ( ! token ) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const isValid = jwt.verify(token, `${process.env.JWT_SECRET}`);
        if (isValid) {
            const userId = atob((token.split('.')[1])).split('"')[3];
            req.authInfo = userId;
            return next();
        }
    } catch (e) {
        console.error(e);
    }
    return res.status(401).send('Unauthorized. Invalid access token');
}