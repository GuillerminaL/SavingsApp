import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

import { get500 } from './error';
import Movement, { MovementType } from '../models/movement';
import Saving from '../models/saving';

type RequestBody = { savingId: string, currencyId: string, concept: string, amount: number };

/**
 * Function getMovements:
 *      - Retrieves a list of max 10 movements, sorted by creation date descending
 * @param req Query Params (optional): savingId, currencyId, active (true/false), page, limit
 * @param res res.status().json{message} | res.status(201).json{movements: []}
 * @returns 500 - Internal error
 *          400 - Invalid ids or no boolean active
 *          200 - List of max 10 movements, sorted by creation date descending
 *          200 - Savings filtered by the specified query params
 */
export async function getMovements(req:Request, res:Response, next: NextFunction) {
    const savingId = req.query.savingId as string;
    const currencyId = req.query.currencyId as string;
    const active = (req.query.active as string)?.toLowerCase();
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    const maxLimit: number = 10;
    try {
        if ( savingId && ! isValidObjectId(savingId) ) {
            return res.status(400).json({message: `Saving id ${savingId} is not a valid id`}); 
        }
        if ( currencyId && ! isValidObjectId(currencyId) ) {
            return res.status(400).json({ message: `Currency id ${currencyId} is not a valid id` }); 
        }
        if ( active && active !== 'true' && active !== 'false' ) {
            return res.status(400).json({ message: `Invalid -no boolean- active param '${active}'` }); 
        }
        //Query construction...
        let stringQuery: string = `{`;
        let q = 0;
        if ( savingId ) {
            stringQuery += `"savingId": "${savingId}"`;
            q += 1;
        }
        if ( currencyId ) {
            if ( q > 0 ) { stringQuery += `, `; }
            stringQuery += `"currencyId": "${currencyId}"`;
            q += 1;
        }
        if ( active ) { 
            if ( q > 0 ) { stringQuery += `, `; }
            stringQuery += `"active": "${active}"`; 
        }
        stringQuery += `}`;
        const jsonQuery = JSON.parse(stringQuery); 
        if ( ! page ) { page = 1 };
        //If no query params are set, will always return a max of 10 items...
        if ( ! limit || limit > maxLimit ) { limit = maxLimit };
        const movements = await Movement.find( jsonQuery )
                                        .skip( (page - 1) * limit )
                                        .limit( limit )
                                        .sort({ createdAt: 'descending'} );
        if ( ! movements ) {
            return res.status(500).json({ 
                message: 'Something went wrong... We are working hard to solve it!' 
            });
        }
        res.status(200).json({ movements: movements });
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

export async function getMovement(req:Request, res:Response, next: NextFunction) {
    const movementId = req.params.movementId;
    try {
        if ( ! isValidObjectId(movementId) ) {
            return res.status(400).json({message: `Movement id ${movementId} is not a valid id`}); 
        }
        const movement = await Movement.findById(movementId);
        if ( ! movement ) {
            return res.status(404).json({message: `Movement id ${movementId} not found`});
        }
        res.status(200).json({movement: movement});        
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

export async function patchMovement(req:Request, res:Response, next: NextFunction) {
    const movementId = req.params.movementId;
    const enteredConcept = req.body.concept as string;
    try {
        if ( ! isValidObjectId(movementId) ) {
            return res.status(400).json({ message: `Movement id ${movementId} is not a valid id` }); 
        }
        const movement = await Movement.findByIdAndUpdate(movementId, {concept: enteredConcept});
        if ( ! movement ) {
            return res.status(404).json({ message: `Movement id ${movementId} not found` });
        }
        res.status(200).json({ message: 'Updated movement concept', updatedMovement: movement });   
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

export async function deleteMovement(req:Request, res:Response, next: NextFunction) {
    const movementId = req.params.movementId;
    try {
        if ( ! isValidObjectId(movementId) ) {
            return res.status(400).json({ message: `Movement id ${movementId} is not a valid id` }); 
        }
        const deletedMovement: MovementType | null = await Movement.findByIdAndUpdate(movementId,  {active: false});
        if ( ! deletedMovement ) {
            return res.status(404).json({message: `Movement id ${movementId} not found`});
        }
        res.status(200).json({message: 'Deleted Movement', deletedMovement: deletedMovement});
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

export async function addMovement(req:Request, res:Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const savingId = body.savingId;
    try {
        if ( ! isValidObjectId(savingId) ) {
            return res.status(400).json({ message: `Saving id ${savingId} is not a valid id` }); 
        }
        const saving = await Saving.findById(savingId);
        if ( ! saving ) {
            return res.status(400).json({ message: `Saving id ${savingId} does not exists` });
        }
        //Checks saving active state...
        if ( ! saving.active ) {
            return res.status(400).json({ message: `Can't add movement. Saving id ${savingId} has been deleted` });
        }
        //Checks saving amount...
        const enteredAmount = Number(body.amount);
        let oldAmount = saving.amount;
        if ( enteredAmount < 0 && Math.abs(enteredAmount) > oldAmount ) {
            return res.status(400).json({ message: `Amount to sustract ${enteredAmount} is greater than existing amount ${oldAmount} `});
        }
        //Registers movement...
        const movement = new Movement({
            concept: body.concept,
            amount: enteredAmount,
            savingId: savingId,
            currencyId: saving.currency.toString()
        });
        const newMovement = await movement.save();
        if ( ! newMovement ) {
            return res.status(500).json({ 
                message: 'Something went wrong while saving the movement... Please, try again later' 
            });
        }
        //Updates saving amount...
        saving.amount = oldAmount + enteredAmount;
        const result = await saving.save();
        if ( ! result ) {
            const deleted = await Movement.findByIdAndDelete(newMovement._id);
            return res.status(500).json({ 
                message: 'Something went wrong while saving the new amount... Please, try again later' 
            });
        }
        //Returns...
        return res.status(201).json({ 
            message: 'Movement done', 
            newSavingAmount: result.amount, 
            newMovement: newMovement
        });
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }                                   
}
