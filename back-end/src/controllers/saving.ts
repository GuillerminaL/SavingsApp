import { Request, Response, NextFunction } from 'express';
import { ObjectId, isValidObjectId } from 'mongoose';

import { get500 } from './error';
import Saving, { PopulatedSavingType } from '../models/saving';
import Tag from '../models/tag';
import Currency from '../models/currency';
import Movement from '../models/movement';
import { convert } from '../utils/converter';

type RequestBody = { currencyId: string, tagId: string };

/**
 * Function getSavings:
 *      - Retrieves all savings or filtered ones
 * @param req @query params (optional): currencyId, tagId, active (true/false)
 * @param res res.status().json{message} | res.status(200).json{savings: []}
 * @returns 500 - Internal error
 *          400 - Invalid ids
 *          200 - All existing savings populated with currency and tag info
 *          200 - Savings filtered by query params populated with currency and tag info
 */
export async function getSavings(req:Request, res:Response, next: NextFunction) {
    const userId = req.authInfo as ObjectId;
    let currencyId = req.query.currencyId as string;
    const currencyCode = (req.query.currencyCode as string)?.toUpperCase();
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
        if ( ! currencyId && currencyCode ) {
            const currency = await Currency.findOne({ code: currencyCode });
            if ( ! currency ) {
                return res.status(400).json({ message: `Invalid currency code '${currencyCode}'` }); 
            }
            currencyId = currency.id;
        }
        //Query construction...
        let stringQuery: string = `{"userId": "${userId}"`;
        let q = 1;
        if ( currencyId ) {
            if ( q > 0 ) { stringQuery += `, `; }
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
            .populate({ path: 'currency', select: 'code name _id' })
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

/**
 * Function getSaving: 
 *      - Allows to get a saving by id
 *      - If a currency code is specified, will show the saving amount current conversion to the specified currency
 * @param req savingId, @query currencyCodeTo(optional)
 * @param res res.status().json{message}
 *            res.status(200).json{saving}
 *            res.status(200).json{saving, conversionAmount}
 * @param next 
 * @returns 
 */
export async function getSaving(req:Request, res:Response, next: NextFunction) {
    const userId = req.authInfo as ObjectId;
    const savingId = req.params.savingId as string;
    const enteredCode = (req.query.currencyCodeTo as string)?.toUpperCase();
    try {
        if ( ! isValidObjectId(savingId) ) {
            return res.status(400).json({ message: `Saving id ${savingId} is not a valid id` }); 
        } 
        const saving = await Saving.findOne({ _id: savingId, userId: userId })
            .populate({ path: 'currency', select: 'code name _id' })
            .populate({ path: 'tag', select: 'name description _id' })
            .exec() as  PopulatedSavingType | null;
        if ( ! saving ) {
            return res.status(404).json({message: `Saving id ${savingId} not found`});
        }       
        //Currency converter
        if ( enteredCode ) {
            const result = await convert(Number(saving.amount), saving.currency.code, enteredCode);
            if ( result && result.status === 200)  {
                return res.status(200).json({conversionAmount: result.conversionAmount, saving });
            } else {
                return res.status(result.status).json({message: result.message});
            }
        }
        return res.status(200).json({saving: saving});
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

/**
 * Function addSaving: 
 *      - Allows to create a new saving with specific tag and currency
 *      - Obs: allows multiple savings with equal tag,
 *             won't allow multiple multiple savings with equal tag and currency 
 * @param req userId (valid, existent and active)
 *            currencyId (valid and existent)
 *            tagId (valid and existent)
 * @param res res.status().json{message} | res.status(201).json{message, saving}
 * @param next 
 * @returns 400 - Invalid id
 *          404 - Inexistent currency or tag
 *          409 - Already existing saving with the specified tagid and currencyid
 *          500 - Internal error
 *          201 - Success, new saving created
 */
export async function addSaving(req:Request, res:Response, next: NextFunction) {
    const userId = req.authInfo as ObjectId;
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
            return res.status(404).json({message: `Can not create saving, Currency id ${currencyId} not found`});
        }
        const tag = await Tag.findOne({ _id: tagId, userId: userId });
        if ( ! tag ) {
            return res.status(404).json({message: `Can not create saving, Tag id ${tagId} not found`});
        }
        const checkExistence = await Saving.findOne({ userId: userId, currency: currencyId, tag: tagId });
        if ( checkExistence) {
            return res.status(409).json({ 
                message: `Can not create saving, already exists one with equal Tag id ${tagId} and Currency id ${currencyId}` 
            });
        }
        //Creates the new saving...
        const saving = new Saving({
            userId: userId,
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
    const userId = req.authInfo as ObjectId;
    const savingId = req.params.savingId;
    try {
        if ( ! isValidObjectId(savingId) ) {
            return res.status(400).json({ message: `Saving id ${savingId} is not a valid id` }); 
        } 
        const saving = await Saving.findOneAndUpdate({_id: savingId, userId: userId}, {$set: { active: false }});
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

//TODO: Send money from one saving to another (may involve money conversion)

/**
 * Function patchSavingCurrency:
 *      - TODO: Allows to change a saving's currency
 *              (Convert the total amount to another currency)
 *      - Obs: Rejects the actions if there's already a saving with equal tag and new currency 
 * @param req @query savingId(valid, existent and active), @body newCurrencyCode (existing)
 * @param res res.status().json{message} | res.status(201).json{message, movement, saving}
 * @param next 
 */
export async function patchSavingCurrency(req:Request, res:Response, next: NextFunction) {
    const userId = req.authInfo as ObjectId;
    const savingId = req.params.savingId;
    const newCurrencyCode: string = req.body.newCurrencyCode;
    try {
        //1 Check id validation and saving/currency existence
        if ( ! isValidObjectId(savingId) ) {
            return res.status(400).json({ message: 'Invalid saving id'});
        }
        const checkSaving = await Saving.findOne({ _id: savingId, userId: userId, active: true });
        if ( ! checkSaving ) {
            return res.status(404).json({ message: `Saving id ${savingId} not found`});
        }
        const checkNewCurrency = await Currency.findOne({code: newCurrencyCode});
        if ( ! checkNewCurrency ) {
            return res.status(404).json({ message: `Currency code ${newCurrencyCode} not found`});
        }
        //Check existance of another saving with equal tag and new currency
        const checkDuplicate = await Saving.findOne({ userId: userId, tag: checkSaving.tag, currency: checkNewCurrency.id });
        if ( checkDuplicate ) {
            return res.status(409).json({ message: `Already exists a saving with equal tag and currency code (saving id ${checkDuplicate.id})`});
        }
        //2 Patch currency
        // Check if current amount is greater than 0
        // YES: Change currency
        if ( checkSaving.amount === 0 ) {
            const patchedSaving = await Saving.findByIdAndUpdate(savingId, {currency: checkNewCurrency.id});
            if ( ! patchedSaving ) {
                return res.status(500).json({ message: 'Some error occured while updating saving currency... Please, try again later'});
            }
            return res.status(200).json({ message: 'Succesfull update', patchedSaving: patchedSaving });
        }
        //NO: Change currency and amount, register movement
        //Get code from
        const currencyFrom = await Currency.findById(checkSaving.currency);
        if ( ! currencyFrom ) {
            return res.status(409).json({ message: `Saving current currency id ${checkSaving.currency} not found`});
        }
        //Convert amount
        const conversion = await convert(checkSaving.amount, currencyFrom.code, checkNewCurrency.code);
        if ( ! conversion.conversionAmount ) {
            return res.status(conversion.status).json({ message: conversion.message }); 
        }
        if ( conversion.conversionAmount < 0 ) {
            return res.status(409).json({ message: `Conversion would lead to a negative saving amount (Conversion resulting amount: ${checkNewCurrency.code} $ ${conversion.conversionAmount})`});
        }
        //Save new currency and amount
        const patchedSaving = await Saving.findByIdAndUpdate(savingId, {amount: conversion.conversionAmount, currency: checkNewCurrency.id});
        if ( ! patchedSaving ) {
            return res.status(500).json({ message: 'Some error occured while updating saving currency and amount.. Please, try again later'});
        }
        //Register movement
        const newConversionMovement = new Movement({
            savingId: savingId,
            currencyId: checkNewCurrency.id,
            concept: `Saving currency conversion (From ${currencyFrom.code}$ ${checkSaving.amount} to ${checkNewCurrency.code}`,
            amount: conversion.conversionAmount
        });
        let newMovement = await newConversionMovement.save();
        if ( ! newMovement ) {
            console.log('Error registering saving new conversion movement');
        }
        return res.status(200).json({ message: 'Succesfull conversion', patchedSaving, newMovement: (newMovement ? newMovement : '' )});
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}