import { Router } from "express";

import { getSavings, getSaving, addSaving, patchSaving, removeSaving } from '../controllers/saving';

const router = Router();

router.get('', getSavings);     //savings?currencyId=:currencyId&tagId=:tagId
                                //TODO &minAmount=:minAmount
                                //TODO &maxAmount=:maxAmount
                                //TODO &amount=:amount
router.post('/', addSaving);
router.get('/:savingId', getSaving);
router.patch('/:savingId', patchSaving); //tag and currency TODO currency converter
router.delete('/:savingId', removeSaving);


export default router;

