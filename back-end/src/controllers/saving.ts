import { Request, Response, NextFunction } from 'express';

import { get500 } from './error';
import Saving from '../models/saving';
import Currency from '../models/currency';
import Movement from '../models/movement';

type RequestBody = { currencyId: string, title: string, description: string };

export async function getSavings(req:Request, res:Response, next: NextFunction) {
    const currencyId = req.query.currencyId;
    try {
        
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }

    Currency.findById(currencyId)
        .then(result => {
            if ( ! result ) {
                return res.status(404).json({message: `Currency id ${currencyId} not found`});
            }
        })
        .then(() => {
            Saving.find({ currencyId: currencyId })
                .then(result => {
                    if ( ! result ) {
                        return res.status(200).json({
                            message: `Currency id ${currencyId} has no related savings`, 
                            savings: result
                        });
                    }
                    res.status(200).json({savings: result});
                });
        })
        .catch(err => {
            console.log(err);
        });
}

export function getSaving(req:Request, res:Response, next: NextFunction) {
    const savingId = req.params.savingId;

    Saving.findById(savingId)
        .then(saving => {
            if ( ! saving)  {
                return res.status(404).json({message: `Saving id ${savingId} not found`});
            } 
            res.status(200).json({saving: saving});
        })
        .catch(err => {
            console.log(err);
        });
}

export async function getSavingMovements(req:Request, res:Response, next: NextFunction) {
    const savingId = req.params.savingId;

    const saving = await Saving.findById(savingId).populate('movements.movementId');
    if ( ! saving ) {
        return res.status(404).json({message: `Saving id ${savingId} not found`});
    }

    res.status(200).json({saving: saving});
}

export function addSaving(req:Request, res:Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const currencyId = body.currencyId;

    //Checks currency existence...
    Currency.findById(currencyId)
        .then(result => {
            if ( ! result ) {
                return res.status(409).json({message: `Can not create saving, Currency id ${currencyId} does not exist`});
            }
            return result;
        })
        .then(() => {
            //Creates the new saving...
            const saving = new Saving({
                currencyId: currencyId,
                title: body.title,
                description: body.description
            });

            saving.save()
                .then(result => {
                    if ( result ) {
                        return res.status(201).json({ message: 'Added Saving', saving: result });
                    }    
                });
        })
        .catch(err => {
            console.log(err);
            // return res.status(500).json({ message: 'Something went wrong... Please, try again later' });
        });
}

export function patchSaving(req:Request, res:Response, next: NextFunction) {
    const savingId = req.params.savingId;
    const enteredTitle: string = req.body.title;
    const enteredDescription : string = req.body.description;


    Saving
        .findById(savingId)
        .then(saving => {
            if ( ! saving ) {
                return res.status(400).json({ 
                    message: `Saving id ${savingId} does not exist` 
                });
            }

            saving.title = enteredTitle;
            saving.description = enteredDescription;
            saving.save()
                .then(result => {
                    if ( result) {
                        res.status(200).json({ message: 'Saving Modified', saving: saving });
                    }
                });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ 
                message: 'Something went wrong... We are working hard to solve it!' 
            });
        });
}

export function removeSaving(req:Request, res:Response, next: NextFunction) {
    const savingId = req.params.savingId;

    Saving
        .findByIdAndDelete(savingId)
        .then(saving => {
            if ( ! saving ) {
                return res.status(404).json({message: `Saving id ${savingId} not found`});
            } 

            Movement.deleteMany({savingId: savingId });

            res.status(200).json({ 
                message: 'Saving Deleted', 
                deletedSaving: saving});
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ 
                message: 'Something went wrong... We are working hard to solve it!' 
            });
        });
}
