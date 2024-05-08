import { Router } from "express";

import { getCurrencies, getCurrency, addCurrency, deleteCurrency, getCurrencyCodes, getCurrencyNames } from '../controllers/currency';

const router = Router();

router.get('/codes', getCurrencyCodes);
router.get('/names', getCurrencyNames);

router.post('/', addCurrency);
router.get('/', getCurrencies);    //get currencies with name containing keyword /currencies?name=name                       
router.get('/:currencyId', getCurrency);
router.delete('/:currencyId', deleteCurrency);

export default router;
