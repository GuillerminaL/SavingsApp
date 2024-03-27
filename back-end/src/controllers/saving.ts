import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

import { get500 } from './error';
import Saving, { PopulatedSavingType, SavingType } from '../models/saving';
import Tag from '../models/tag';
import Currency from '../models/currency';
import Movement from '../models/movement';
import { CURRENCY_CODES, currencyConvertion } from '../utils/converter';

type RequestBody = { currencyId: string, tagId: string };

/**
 * Function getSavings:
 *      - Retrieves all savings or filtered ones
 * @param req Query params (optional): currencyId, tagId, active (true/false)
 * @param res res.status().json{message} | res.status(201).json{savings: []}
 * @returns 500 - Internal error
 *          400 - Invalid ids
 *          200 - All existing savings populated with currency and tag info
 *          200 - Savings filtered by query params populated with currency and tag info
 */
export async function getSavings(req:Request, res:Response, next: NextFunction) {
    const currencyId = req.query.currencyId as string;
    const tagId = req.query.tagId as string;
    const active = (req.query.active as string)?.toLowerCase();
    try {
        if ( currencyId && ! isValidObjectId(currencyId) ) {
            return res.status(400).json({ message: `Currency id ${currencyId} is not a valid id` }); 
        } 
        if ( tagId && ! isValidObjectId(tagId) ) {
            return res.status(400).json({ message: `Tag id ${tagId} is not a valid id` }); 
        }
        if ( active && active !== 'true' && active !== 'false' ) {
            return res.status(400).json({ message: `Invalid -no boolean- active param '${active}'` }); 
        }
        //Query construction...
        let stringQuery: string = `{`;
        let q = 0;
        if ( currencyId ) {
            stringQuery += `"currency": "${currencyId}"`;
            q += 1;
        }
        if ( tagId ) {
            if ( q > 0 ) { stringQuery += `, `; }
            stringQuery += `"tag": "${tagId}"`;
            q += 1;
        }
        if ( active ) { 
            if ( q > 0 ) { stringQuery += `, `; }
            stringQuery += `"active": "${active}"`; 
        }
        stringQuery += `}`;
        const jsonQuery = JSON.parse(stringQuery);
        const savings = await Saving.find( jsonQuery )
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
    const savingId = req.params.savingId as string;
    const enteredCode = req.query.currencyCodeTo as string;
    try {
        if ( ! isValidObjectId(savingId) ) {
            return res.status(400).json({ message: `Saving id ${savingId} is not a valid id` }); 
        } 
        const saving = await Saving.findById(savingId)
            .populate({ path: 'currency', select: 'code name imageUrl _id' })
            .populate({ path: 'tag', select: 'name description _id' })
            .exec() as  PopulatedSavingType | null;
        if ( ! saving ) {
            return res.status(404).json({message: `Saving id ${savingId} not found`});
        }       
        //Currency converter
        if ( enteredCode ) {
            if ( ! CURRENCY_CODES.includes(enteredCode) ) {
                return res.status(400).json({
                    message: `Currency code ${enteredCode} is not a valid currency conversion code`, 
                    validCodes: CURRENCY_CODES });
            }
            const codeFrom = saving.currency.code;
            console.log(codeFrom, enteredCode);
            const amount = Number(saving.amount);
            const convertion = await currencyConvertion(enteredCode, codeFrom, amount);
            if ( typeof convertion === "string" ) {
                return res.status(400).json({ message: convertion });
            }
            return res.status(200).json({saving: saving, convertion: convertion});
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

/**
 * Function patchSaving:
 *      - TODO : Should provide a way to convert money amount to another currency
 * @param req 
 * @param res 
 * @param next 
 */
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

/**
 * Function removeSaving:
 *      - Sets the saving active state = false  (logical delete)
 *      - Sets all related movements active state = false (logical delete)
 * @param req Param: savingId
 * @param res res.status().json{message} | res.status(201).json{message, deletedSaving, count of deleted movements}
 * @returns 500 - Internal error
 *          400 - Invalid ids
 *          200 - Saving and movements have been deleted (active state = false)
 */
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
