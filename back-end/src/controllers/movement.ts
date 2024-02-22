import { Request, Response, NextFunction } from 'express';
import mongoose, { InferSchemaType, isValidObjectId, Types } from 'mongoose';

import { get500 } from './error';
import Movement, { MovementType } from '../models/movement';
import Saving, { SavingType } from '../models/saving';

type RequestBody = { savingId: string, concept: string, amount: number };

export async function getMovements(req:Request, res:Response, next: NextFunction) {
    const savingId = req.query.savingId as string;
    try {
        if ( ! isValidObjectId(savingId) ) {
            return res.status(400).json({message: `Saving id ${savingId} is not a valid id`}); 
        }
        const saving = await Saving.findById(savingId);
        if ( ! saving ) {
            return res.status(404).json({message: `Saving id ${savingId} not found`});
        } 
        if ( saving.movements.length === 0 ) {
            return res.status(404).json({ movements: [] });
        }
        const movements = await Movement.find({ savingId: savingId });
        return res.status(200).json({ movements: movements });
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
    // const savingId = req.params.savingId;
    const movementId = req.params.movementId;
    try {
        if ( ! isValidObjectId(movementId) ) {
            return res.status(400).json({ message: `Movement id ${movementId} is not a valid id` }); 
        }
        const deletedMovement: MovementType | null = await Movement.findByIdAndDelete(movementId);
        if ( ! deletedMovement ) {
            return res.status(404).json({message: `Movement id ${movementId} not found`});
        }
        //Updates saving...
        const savingId = deletedMovement.savingId;
        const saving = await Saving.findById(savingId);
        //The following check implies that is possible to delete a saving without removing its movements...
        if ( saving ) {
            let updatedMovements = saving.movements.filter(movement => {
                return movement.movementId.toString() !== movementId;
            });
            console.log(updatedMovements);
            saving.movements = updatedMovements as Types.DocumentArray<{movementId: Types.ObjectId; }>;
            const result = await saving.save();
            if ( ! result ) {
                
            }
            res.status(200).json({message: 'Deleted Movement', deletedMovement: deletedMovement});
        }
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
        //Checks saving amount...
        const enteredAmount = body.amount;
        let oldAmount = saving.amount;
        if ( enteredAmount < 0 && Math.abs(enteredAmount) > oldAmount ) {
            return res.status(400).json({ message: `Amount to sustract ${enteredAmount} is greater than existing amount ${oldAmount} `});
        }
        //Registers movement...
        const movement = new Movement({
            concept: body.concept,
            amount: enteredAmount,
            savingId: savingId
        });
        const newMovement = await movement.save();
        if ( ! newMovement ) {
            return res.status(500).json({ 
                message: 'Something went wrong while saving the movement... Please, try again later' 
            });
        }
        //Updates saving amount and list of movements...
        saving.amount = oldAmount + enteredAmount;
        saving.movements.push( {movementId: newMovement._id} );
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
