import { Router } from "express";

import { getSavings, getSaving, addSaving, patchSavingCurrency, removeSaving } from '../controllers/saving';

const router = Router();

router.get('', getSavings);     //savings?currencyId=:currencyId&tagId=:tagId&active=:active
                                //TODO &minAmount=:minAmount
                                //TODO &maxAmount=:maxAmount
                                //TODO &amount=:amount
router.post('/', addSaving);
router.get('/:savingId', getSaving);
router.patch('/:savingId', patchSavingCurrency);
router.delete('/:savingId', removeSaving);


export default router;

