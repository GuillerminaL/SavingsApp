import { Request, Response, NextFunction } from 'express';

export function get404(req:Request, res:Response, next: NextFunction ) {
    return res.status(404).json({  message: 'Page Not Found' });
}

export function get500(req:Request, res:Response, next: NextFunction) {
    return res.status(500).json({ 
        message: 'Ups! Something went wrong... We are working hard to solve it' 
    });
}