import { Router } from "express";

import { getCurrencies, getCurrency, addCurrency, patchCurrency, deleteCurrency } from '../controllers/currency';

const router = Router();

router.post('/', addCurrency);
router.get('/', getCurrencies);    //get currencies with name containing keyword /currencies?name=name                       
router.get('/:currencyId', getCurrency);
router.patch('/:currencyId', patchCurrency); //ImageUrl
router.delete('/:currencyId', deleteCurrency);

export default router;
