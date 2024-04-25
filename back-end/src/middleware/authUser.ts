import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import User from '../models/user';
import { get500 } from '../controllers/error';

/**
 * Function userAuth: 
 *          Checks user existence and active state;
 * @param req authInfo(token)
 * @param res res.status().json({ message}) | sets request user and continues;
 * @param next 
 * @returns 400 - Invalid id
 *          404 - User not found
 *          409 - Inactive account
 *          500 - Internal error
 *          200 - next();
 */
export async function authUser(req:Request, res:Response, next: NextFunction) {
    const userId = req.authInfo;
    if ( ! isValidObjectId(userId) ) {
        return res.status(400).json({ message: `Invalid user id ${userId}` }); 
    } 
    try {
        const user = await User.findById(userId);
        if ( ! user ) {
            return res.status(404).json({ message: `User id ${userId} not found` }); 
        }
        if ( ! user.active ) {
            return res.status(409).json({ message: `Inactive account` });
        }
        req.user = user;
        return next();   
    } catch (e) {
        console.error(e);
        return get500(req, res, next);
    }
}