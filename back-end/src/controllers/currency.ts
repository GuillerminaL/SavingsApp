import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

import { get500 } from './error';
import Currency from '../models/currency';
import Saving from '../models/saving';
import Movement from '../models/movement';

type RequestBody = { name: string, imageUrl: string | null };

/**
 * Function getCurrencies: 
 *      - Returns all currencies or currencies whose name contains the specified name keyword
 * @param req Optional query param: name
 * @param res res.status().json{message} | res.status(200).json{message, currencies: []}
 * @returns 404 - There´s no currency named as specified
 *          200 - All existing currencies
 *          200 - Currency filtered by 'name' containing keyword (optional query param)
 */
export async function getCurrencies(req:Request, res:Response, next: NextFunction) {
    const enteredName = req.query.name as string;
    try {
        if ( enteredName ) {
            const regex = new RegExp(enteredName, 'i') // i for case insensitive
            const currencies = await Currency.find({ name: {$regex: regex} });
            if ( ! currencies ) {
                return res.status(500).json({message: `Something went wrong... We are working hard to solve it!`});   
            }
            if ( currencies.length === 0 ) {
                return res.status(404).json({message: `There´s no currencies with name containing '${enteredName}'`, currencies: currencies});   
            }
            return res.status(200).json({currencies: currencies});
        } 
        const currencies = await Currency.find();
        if ( ! currencies ) {
            return res.status(500).json({ 
                message: 'Something went wrong... We are working hard to solve it!' 
            });
        }
        return res.status(200).json({currencies: currencies});  
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

export async function getCurrency(req:Request, res:Response, next: NextFunction) {
    const currencyId = req.params.currencyId;
    try {
        if ( ! isValidObjectId(currencyId) ) {
            return res.status(400).json({message: `Currency id ${currencyId} is not a valid id`}); 
        }
        const currency = await Currency.findById(currencyId);
        if ( ! currency ) {
            return res.status(404).json({message: `Currency id ${currencyId} not found`});   
        }
        return res.status(200).json({currency: currency});
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

/**
 * Function addCurrency:
 *   - Name is always transform to lower case
 *   - Currency name must be unique
 * @param req 'name' and 'image url'
 * @param res res.status().json{message} | res.status(201).json{message, newCurrency}
 * @returns 400 - Must specify name | image url
 *          400 - Already exists a currency name as specified
 *          201 - Confirm message and new entity
 */
export async function addCurrency(req:Request, res:Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const enteredName = body.name as string;
    const enteredImageUrl = body.imageUrl as string;
    try {
        //Checks inputs...
        if ( ! enteredName ) {
            return res.status(400).json({message: `Must specify a currency name`});
        }
        if ( ! enteredImageUrl ) {
            return res.status(400).json({message: `Must specify a image url`});
        }
        const currencyName = enteredName.toLowerCase();
        const checkName = await Currency.find({ name: currencyName });
        if ( checkName.length !== 0 ) {
            return res.status(400).json({ 
                message: `Already exists a currency named '${enteredName}'` 
            });
        }
        //Saves and returns...
        const currency = new Currency({
            name: currencyName, 
            imageUrl: enteredImageUrl
        });
        const newCurrency = await currency.save();
        if ( ! newCurrency ) {
            return res.status(500).json({ 
                message: 'Something went wrong... We are working hard to solve it!' 
            });
        }
        return res.status(201).json({ message: 'Added Currency', newCurrency: newCurrency });        
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

/**
 * Function patchCurrency:
 *      - Allows to change the image of a currency
 * @param req Param: Currency id
 * @param res res.status().json{message} | res.status(200).json{message, updatedCurrency}
 * @returns 400 - Invalid Currency id 
 *          400 - Must specify image url
 *          404 - Currency id not found
 *          500 - Internal error
 *          200 - Currency imageUrl has been patched
 */

export async function patchCurrency(req:Request, res:Response, next: NextFunction) {
    const currencyId = req.params.currencyId;
    try {
        if ( ! isValidObjectId(currencyId) ) {
            return res.status(400).json({message: `Currency id ${currencyId} is not a valid id`}); 
        }
        //Checks currency existence...
        const toPatchCurrency = await Currency.findById(currencyId);
        if ( ! toPatchCurrency ) {
            return res.status(404).json({message: `Currency id ${currencyId} does not exist`});
        }
        //Checks input...
        const enteredImageUrl = req.body.imageUrl as string | null;
        if ( ! enteredImageUrl ) {
            return res.status(400).json({
                message: `Must specify currency 'image url'`
            });
        }
        toPatchCurrency.imageUrl = enteredImageUrl;
        //Saves and returns...
        const patchedCurrency = await toPatchCurrency.save();
        if ( ! patchedCurrency ) {
            return res.status(500).json({ 
                message: 'Something went wrong... We are working hard to solve it!' 
            });
        }
        res.status(200).json({ message: 'Updated Currency', updatedCurrency: patchedCurrency });
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

/**
 * Function deleteCurrency:
 *      - Removes permanently a currency from database, if there´s no savings or movements related to it
 * @param req Param: currencyId
 * @param res res.status().json{message} | res.status(200).json{message, deletedCurrency}
 * @returns 400 - Invalid Currency id 
 *          409 - Can´t remove -it has related savings or movements-
 *          404 - Currency id not found
 *          500 - Internal error
 *          200 - Currency has been permanently deleted
 */
export async function deleteCurrency(req:Request, res:Response, next: NextFunction) {
    const currencyId = req.params.currencyId;
    try {
        if ( ! isValidObjectId(currencyId) ) {
            return res.status(400).json({message: `Currency id ${currencyId} is not a valid id`}); 
        }
        //Checks related savings existence (active or inactive)...
        const checkCurrencySavings = await Saving.findOne({ currency: currencyId });
        if ( checkCurrencySavings ) {
            return res.status(409).json({
                message: `Can not remove Currency id ${currencyId}. It has related savings`
            });
        }
        //Checks related movements existence (active or inactive): 
        //Even though a movement requires a saving, the saving currency may change and 
        //leave the movement related to its old currency...
        const checkCurrencyMovements = await Movement.findOne({ currencyId: currencyId });
        if ( checkCurrencyMovements ) {
            return res.status(409).json({
                message: `Can not remove Currency id ${currencyId}. It has related movements`
            });
        }
        //Deletes and returns...
        const deletedCurrency = await Currency.findByIdAndDelete(currencyId);
        if ( ! deletedCurrency ) {
            return res.status(404).json({ message: `Currency id ${currencyId} not found`});
        }                
        res.status(200).json({ message: `Currency deleted`, deletedCurrency: deletedCurrency });
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}