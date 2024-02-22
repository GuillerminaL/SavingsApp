import { Router } from "express";

import { getMovements, getMovement, addMovement, patchMovement, deleteMovement  } from '../controllers/movement';

const router = Router();

router.get('', getMovements);       //movements?savingId=:savingId
                                    //TODO movements?currencyId=:currencyId
                                    //TODO movements?createdFrom=:createdFrom
                                    //TODO movements?createdTo=:createdTo
router.post('/', addMovement);
router.get('/:movementId', getMovement);
router.patch('/:movementId', patchMovement);   //Edits concept
router.delete('/:movementId', deleteMovement);


export default router;
