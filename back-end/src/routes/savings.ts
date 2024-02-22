import { Router } from "express";

import { getSavings, getSaving, addSaving, patchSaving, removeSaving } from '../controllers/saving';

const router = Router();

router.get('', getSavings);     //savings?currencyId=:currencyId
                                //TODO savings?minAmount=:minAmount
                                //TODO savings?keywords=:keywords
router.post('/', addSaving);
router.get('/:savingId', getSaving);
router.patch('/:savingId', patchSaving); //title and description
router.delete('/:savingId', removeSaving);


export default router;

