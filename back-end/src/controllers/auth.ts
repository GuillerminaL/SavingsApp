import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { compareSync, hashSync } from 'bcryptjs';

import User, { UserType } from '../models/user';
import Saving from '../models/saving';
import Movement from '../models/movement';
import { getToken, getRefreshedToken, deleteRefreshToken } from '../utils/tokenHandler';
import { get500 } from './error';

type RequestParams = { userId: string };

export async function login(req:Request, res:Response, next: NextFunction) {
    const email = req.body.email;
    const password = req.body.password ? req.body.password : null;
    try {
        const existingUser = await User.findOne({ email: email });
        if ( ! existingUser ) {
            return res.status(404).json({message: `User email ${email} not found`}); 
        }
        if ( ! existingUser.active ) {
            return res.status(400).json({message: `Inactive user account`}); 
        }
        if ( password && existingUser.password ) {
            const checkPassword = compareSync(password, existingUser.password);
            if ( ! checkPassword ) {
                return res.status(404).json({message: `Incorrect password`}); 
            }
            const token = await getToken(existingUser.id);
            if ( token ) {
                return res.status(200).json({ message: 'User logged in succefully', 
                                          auth: token,
                                          user: {
                                            id: existingUser.id,
                                            given_name: existingUser.given_name, 
                                            family_name: existingUser.family_name,
                                            email: existingUser.email,
                                            photoURL: existingUser.photoURL
                                        }});
            }
        }
    } catch (error) {
        console.log(error);
        return get500(req, res, next);
    }
}

/**
 * Function signup: 
 * @param req Google credentials: {given_name, family_name, email, photoURL, accountId, provider }
 *            Manual credentials: {given_name, family_name, email, password, confirmPassword }
 * @param res res.status().json{message} | res.status(201).json{message, newUser}
 * @param next 
 * @returns 500 - Internal error
 *          400 - Already exists an active user with the specified email 
 *          409 - User with the specified email is inactive
 *          201 - Confirm message and new entity
 */
export async function signup(req:Request, res:Response, next: NextFunction) {
    const { email, given_name, family_name, photoURL } = req.body;
    let password = req.body.password ? hashSync(req.body.password, 12) : null;
    try {
        const existingUser = await User.findOne({ email: email });
        if ( existingUser ) {
            return ( existingUser.active ) ? 
                res.status(400).json({message: `Already exists an active user account with email ${email}`})
                : res.status(409).json({message: `Inactive user account email ${email}`});
        } 
        const user = new User({ 
            given_name: given_name,
            family_name: family_name,
            email: email,
            password,
            photoURL,
        });
        const newUser = await user.save();
        if ( newUser ) {
            return res.status(201).json({ message: 'User signed up succefully', userId: newUser._id });
        }
    } catch (error) {
        console.log(error);
        return get500(req, res, next);
    }
}

/**
 * Function refreshToken      
 * @param req body {userId: existent and active, refreshToken}
 * @param res res.status().json{message} | res.status(200).json{message, refreshedToken}
 * @param next 
 * @returns 500 - Internal error
 *          400 - Must provide User id and Refresh token 
 *          400 - Invalid user id
 *          400 - Invalid token or not related to user
 *          409 - Inexistent or inactive User id
 *          201 - Token refreshed succesfully
 */
export async function refreshToken(req:Request, res:Response, next: NextFunction) {
    const userId = req.body.userId;
    const oldRefreshToken = req.body.refreshToken;
    if ( ! userId || ! oldRefreshToken ) {
        return res.status(400).json({ message: `Must provide User id and Refresh token` });
    }
    try {
        if ( ! isValidObjectId(userId) ) {
            return res.status(400).json({ message: `Invalid User id ${userId}` }); 
        }
        const checkUser = await User.findOne({ _id: userId, active: true });
        if ( ! checkUser ) {
            return res.status(409).json({ message: `Inexistent or inactive User id ${userId}` }); 
        }
        const refreshedToken = await getRefreshedToken(userId, oldRefreshToken);
        if ( ! refreshedToken ) {
            return res.status(400).json({ 
                message: `Invalid Refresh Token ${oldRefreshToken} or not related to user id ${userId}` 
            }); 
        }
        return res.status(200).json({ message: 'Token refreshed succesfully', refreshedToken: refreshedToken });
    } catch (error) {
        console.log(error);
        return get500(req, res, next);
    }
}

export async function activateAccount(req:Request, res:Response, next: NextFunction) {
    const userId = req.params.userId;
    try {
        if ( ! isValidObjectId(userId) ) {
            return res.status(400).json({ message: `User id ${userId} is not a valid id` }); 
        }
        const checkUser = await User.findByIdAndUpdate(userId, { active: true });
        if ( ! checkUser ) {
            return res.status(404).json({message: `User id ${userId} not found`}); 
        }
        return res.status(200).json({ message: `Succefully activated account user id ${userId}`, user: checkUser });
    } catch (error) {
        console.log(error);
        return get500(req, res, next);
    }
}

/**
 * Function deactivateAccount: (logical delete)
 *          Sets a user, its related savings and movements active states to false. Deletes the refresh token asign to user
 * @param req Params: userId
 * @param res res.status(404).json{message} | res.status(201).json{message, deletedUser, count of deleted savings, count of deleted movements}
 * @param next 
 * @returns 500 - Internal error
 *          400 - Invalid id
 *          409 - Inexistent ar inactive account
 *          200 - Saving and movements have been deleted (active state = false)
 */
export async function deactivateAccount(req:Request, res:Response, next: NextFunction) {
    const userId = req.authInfo as string;
    try {
        let deletedMovements = 0;
        let deletedSavings = 0;
        let savings = await Saving.find({ userId: userId });
        if ( savings.length > 0 ) {
            //Set movements inactive
            const movementsResult = await Movement.updateMany(
                { savingId: { $in: savings.map(s => s._id) } }, 
                { $set: { active: false }} );
            deletedMovements = movementsResult.matchedCount;
            //Set savings inactive
            const savingsResult = await Saving.updateMany({ userId: userId }, {$set: { active: false }});
            deletedSavings = savingsResult.matchedCount;
        }
        await deleteRefreshToken(userId);
        const deactivatedUser = await User.findByIdAndUpdate(
            userId, {$set: { active: false }}, { new: true }
        );
        return res.status(200).json({ message: `Successfully deactivated account User id ${userId}`, 
                    user: deactivatedUser, 
                    deletedSavings: deletedSavings, 
                    deletedMovements: deletedMovements });
    } catch (error) {
        console.log(error);
        return get500(req, res, next);
    }
}

