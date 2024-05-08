import { Router } from "express";

import { getCurrencies, getCurrency, getCurrencyCodes, getCurrencyNames } from '../controllers/currency';

const router = Router();

router.get('/codes', getCurrencyCodes);
router.get('/names', getCurrencyNames);
router.get('/', getCurrencies);    //get currencies with name containing keyword /currencies?name=name                       
router.get('/:currencyId', getCurrency);

export default router;
