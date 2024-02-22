import { Router } from "express";

import { getCurrencies, getCurrency, addCurrency, patchCurrency, deleteCurrency } from '../controllers/currency';

const router = Router();

router.post('/', addCurrency);
router.get('/', getCurrencies);    
                                            //TODO /currencies?keyword=:keyword
router.get('/:currencyId', getCurrency);
router.patch('/:currencyId', patchCurrency); //Name and imageUrl
router.delete('/:currencyId', deleteCurrency);

export default router;
