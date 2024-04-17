import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

import 'dotenv/config';
import googleAuth from '../models/auth_dal';

let userProfile: any = null;

//request at /auth/google
export function passportAuthenticate(req:Request, res:Response, next: NextFunction) {
    passport.authenticate('google', { scope: ['profile', 'email']});
}

//Must be the same as 'Authorized redirect URIs' field of 0Auth client
export function passportAuthenticateCallback(req:Request, res:Response, next: NextFunction) {
    passport.authenticate('google', {failureRedirect: '/auth/error'});
    res.redirect('/auth/success');
}

export async function onSuccess(req:Request, res:Response, next: NextFunction) {
    const response = await googleAuth.registerWithGoogle(userProfile);
    response.success ? 
        res.status(200).send({ user: userProfile } ) : 
        res.status(400).send( response.message ) ;
}

export async function onError(req:Request, res:Response, next: NextFunction) {
    res.status(400).send({ message: 'Error logging in'});
}

export async function onSignout(req:Request, res:Response, next: NextFunction) {
    try {
        req.session.destroy;
        res.status(200).send({ message: 'Signed out succefully'});
    } catch (error) {
        res.status(400).send({ message: 'Failed to sign out user'});
    }
}

