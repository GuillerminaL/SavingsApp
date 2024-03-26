import { Router } from "express";

import { getSavings, getSaving, addSaving, patchSaving, removeSaving } from '../controllers/saving';

const router = Router();

router.get('', getSavings);     //savings?currencyId=:currencyId&tagId=:tagId&active=:active
                                //TODO &minAmount=:minAmount
                                //TODO &maxAmount=:maxAmount
                                //TODO &amount=:amount
router.post('/', addSaving);
router.get('/:savingId', getSaving);
router.patch('/:savingId', patchSaving); //TODO currency converter
router.delete('/:savingId', removeSaving);


export default router;

