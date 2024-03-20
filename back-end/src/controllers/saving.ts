import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

import { get500 } from './error';
import Saving from '../models/saving';
import Tag from '../models/tag';
import Currency from '../models/currency';
import Movement from '../models/movement';

type RequestBody = { currencyId: string, tagId: string };

export async function getSavings(req:Request, res:Response, next: NextFunction) {
    const currencyId = req.query.currencyId;
    const tagId = req.query.tagId;
    try {
        if ( currencyId && ! isValidObjectId(currencyId) ) {
            return res.status(400).json({ message: `Currency id ${currencyId} is not a valid id` }); 
        } 
        if ( tagId && ! isValidObjectId(tagId) ) {
            return res.status(400).json({ message: `Tag id ${tagId} is not a valid id` }); 
        }
        let query = {};
        if ( currencyId && ! tagId ) {
            query = { currency: currencyId };
        }
        if ( ! currencyId && tagId ) {
            query = { tag: tagId };
        }
        if ( currencyId && tagId ) {
            query = { currency: currencyId, tag: tagId };
        }
        const savings = await Saving.find( query )
            .populate({ path: 'currency', select: 'name imageUrl _id' })
            .populate({ path: 'tag', select: 'name description _id' })
            .exec();
        if ( ! savings ) {
            return res.status(500).json({ 
                message: 'Something went wrong while fetching savings... Please, try again later!' 
            });
        }
        res.status(200).json({ savings: savings });
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

export async function getSaving(req:Request, res:Response, next: NextFunction) {
    const savingId = req.params.savingId;
    try {
        if ( ! isValidObjectId(savingId) ) {
            return res.status(400).json({ message: `Saving id ${savingId} is not a valid id` }); 
        } 
        const saving = await Saving.findById(savingId)
            .populate({ path: 'currency', select: 'name imageUrl _id' })
            .populate({ path: 'tag', select: 'name description _id' })
            .exec();
        if ( ! saving ) {
            return res.status(404).json({message: `Saving id ${savingId} not found`});
        }
        res.status(200).json({saving: saving});
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

export async function addSaving(req:Request, res:Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const currencyId = body.currencyId;
    const tagId = body.tagId;
    try {
        if ( ! isValidObjectId(currencyId) ) {
            return res.status(400).json({ message: `Currency id ${currencyId} is not a valid id` }); 
        } 
        if ( ! isValidObjectId(tagId) ) {
            return res.status(400).json({ message: `Tag id ${tagId} is not a valid id` }); 
        }
        const currency = await Currency.findById(currencyId);
        if ( ! currency ) {
            return res.status(409).json({message: `Can not create saving, Currency id ${currencyId} does not exist`});
        }
        const tag = await Tag.findById(tagId);
        if ( ! tag ) {
            return res.status(409).json({message: `Can not create saving, Tag id ${tagId} does not exist`});
        }
        const checkExistence = await Saving.findOne({ currency: currencyId, tag: tagId });
        console.log(checkExistence);
        if ( checkExistence) {
            return res.status(400).json({ 
                message: `Can not create saving, already exists one tagId ${tagId} and currencyId ${currencyId}` 
            });
        }
        //Creates the new saving...
        const saving = new Saving({
            currency: currencyId,
            tag: tagId
        });
        const newSaving = await saving.save();
        if ( ! newSaving ) {
            return res.status(500).json({ 
                message: 'Something went wrong... We are working hard to solve it!' 
            });
        } 
        res.status(201).json({ message: 'Added Saving', saving: newSaving });
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

export function patchSaving(req:Request, res:Response, next: NextFunction) {
    const savingId = req.params.savingId;
    const enteredCurrencyId: string = req.body.currencyId;
    const enteredAmount : string = req.body.amount;
    try {
        //Should check if there is already other saving with equal tag and the new currency
        //If so, --> convert an add to the other saving, registering the two movements
        //If not, if amount to convert equals      
        //Should visit a converter and save the new amount and currency

        //Should this just go in movements?
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

export async function removeSaving(req:Request, res:Response, next: NextFunction) {
    const savingId = req.params.savingId;
    try {
        if ( ! isValidObjectId(savingId) ) {
            return res.status(400).json({ message: `Saving id ${savingId} is not a valid id` }); 
        } 
        const saving = await Saving.findByIdAndUpdate(savingId, { active: false });
        if ( ! saving ) {
            return res.status(404).json({message: `Saving id ${savingId} not found`});
        }
        const deletedMovements = await Movement.updateMany({ savingId: savingId }, {$set: { active: false }} );
        res.status(200).json({message: 'Deleted saving', deletedSaving: saving, updatedMovements: deletedMovements.matchedCount});
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}
