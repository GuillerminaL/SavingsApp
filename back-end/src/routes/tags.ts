import { Router } from "express";

import { getTags, getTag, addTag, patchTag, deleteTag } from '../controllers/tag';

const router = Router();

router.post('/', addTag);
router.get('/', getTags);    
                                            //TODO /tags?keyword=:keyword
router.get('/:currencyId', getTag);
router.patch('/:currencyId', patchTag); //Name and description
router.delete('/:currencyId', deleteTag);

export default router;
