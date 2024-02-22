import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

import { get500 } from './error';
import Currency from '../models/currency';
import Saving from '../models/saving';


type RequestBody = { name: string, imageUrl: string | null };

export async function getCurrencies(req:Request, res:Response, next: NextFunction) {
    try {
        const currencies = await Currency.find();
        if ( ! currencies ) {
            return res.status(404).json({ 
                message: 'No currencies where found' 
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

export async function addCurrency(req:Request, res:Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const enteredName = body.name;
    try {
        //Checks name input...
        if ( ! enteredName ) {
            return res.status(400).json({message: `Must specify a currency name`});
        }
        const checkName = await Currency.find({ name: enteredName });
        if ( checkName.length !== 0 ) {
            return res.status(400).json({ 
                message: `Already exists a currency named ${enteredName}` 
            });
        }
        //Saves and returns...
        const currency = new Currency({
            name: enteredName, 
            imageUrl: body.imageUrl
        });
        const newCurrency = await currency.save();
        if ( ! newCurrency ) {
            return res.status(500).json({ 
                message: 'Something went wrong... We are working hard to solve it!' 
            });
        }
        return res.status(201).json({ message: 'Added Currency', currency: newCurrency });        
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

export async function patchCurrency(req:Request, res:Response, next: NextFunction) {
    const currencyId = req.params.currencyId;
    try {
        if ( ! isValidObjectId(currencyId) ) {
            return res.status(404).json({message: `Currency id ${currencyId} is not a valid id`}); 
        }
        //Checks currency existence...
        const toPatchCurrency = await Currency.findById(currencyId);
        if ( ! toPatchCurrency ) {
            return res.status(400).json({message: `Currency id ${currencyId} does not exist`});
        }
        //Checks input...
        const enteredName = req.body.name as string | null;
        const enteredImageUrl = req.body.imageUrl as string | null;
        if ( !enteredName && !enteredImageUrl ) {
            return res.status(400).json({
                message: `Must specify the currency attribute to edit: name and/or imageUrl)`
            });
        }
        if ( enteredName ) {
            if ( enteredName === "" ) {
                return res.status(400).json({message: `Must specify a currency name`});
            }
            const checkName = await Currency.find({ name: enteredName });
            if ( checkName.length !== 0 ) {
                return res.status(400).json({ 
                    message: `Already exists a currency named ${enteredName}` 
                });
            }
            toPatchCurrency.name = enteredName;
        }
        if ( enteredImageUrl ) {
            toPatchCurrency.imageUrl = enteredImageUrl;
        }
        //Saves and returns...
        const patchedCurrency = await toPatchCurrency.save();
        if ( ! patchedCurrency ) {
            return res.status(500).json({ 
                message: 'Something went wrong... We are working hard to solve it!' 
            });
        }
        res.status(200).json({ message: 'Updated Currency', patchedCurrency: patchedCurrency });
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

export async function deleteCurrency(req:Request, res:Response, next: NextFunction) {
    const currencyId = req.params.currencyId;
    try {
        if ( ! isValidObjectId(currencyId) ) {
            return res.status(404).json({message: `Currency id ${currencyId} is not a valid id`}); 
        }
        //Checks savings related...
        const currencySavings = await Saving.findOne({ currencyId: currencyId });
        if ( currencySavings ) {
            return res.status(409).json({
                message: `Can not remove Currency id ${currencyId}. It has related savings`
            });
        }
        //Deletes and returns...
        const deletedCurrency = await Currency.findByIdAndDelete(currencyId);
        if ( ! deletedCurrency ) {
            return res.status(404).json({message: `Currency id ${currencyId} not found`});
        }                
        res.status(200).json({message: `Currency deleted`, currency: deletedCurrency });
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}