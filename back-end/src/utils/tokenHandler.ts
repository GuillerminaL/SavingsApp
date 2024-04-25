import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongoose';

import RefreshToken from '../models/refreshToken';

function generateToken(userId: ObjectId, refreshToken: String) {
    const token = jwt.sign({ id: userId }, `${process.env.JWT_SECRET}`, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + Number(process.env.JWT_EXPIRES_IN_MLS));
    return { token, expiryDate, refreshToken: refreshToken };
}

/**
 * Function getToken:
 *          - Updates an existing refresh token related to the user or creates a new one
 * @param userId 
 * @returns { token, expiryDate, refreshToken }
 */
export async function getToken(userId: ObjectId) {
    try {
        const newRefreshToken = uuidv4();
        const refreshToken = await RefreshToken.updateOne(
            { userId: userId }, { $set: {  refreshToken: newRefreshToken }}, { upsert: true });
        if ( refreshToken ) {
            return generateToken(userId, newRefreshToken);
        }
    } catch (e) {
        console.error(e);
        return;
    }  
}

/**
 * Function getRefreshedToken: 
 *      - Searchs the refresh token (by refresh token and user id) and replaces the refresh token value
 *          with a new one --> 
 *          Implicit Bussiness rule:
 *              - One to One relation : a refresh token belongs to one user and 
 *                          one user has one and only one refresh token.
 * @param userId valid, existent and active
 * @param oldRefreshToken valid and existent, user id related
 * @returns { token, expiryDate, refreshToken }
 */
export async function getRefreshedToken(userId: ObjectId, oldRefreshToken: String) {
    try {
        const refreshedToken = await RefreshToken.findOneAndUpdate(
            {refreshToken: oldRefreshToken, userId: userId}, {$set: {refreshToken: uuidv4()}}, {new: true} 
        );
        if ( refreshedToken ) {
            return generateToken(userId, refreshedToken.refreshToken);
        }
    } catch (e) {
        console.error(e);
        return;
    }
}

export async function deleteRefreshToken(userId: string) {
    try {
        await RefreshToken.findOneAndDelete({userId: userId});
    } catch (e) {
        console.error(e);
    }
    return;
}