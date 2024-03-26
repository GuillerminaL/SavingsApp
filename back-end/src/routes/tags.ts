import { Router } from "express";

import { getTags, getTag, addTag, patchTag, deleteTag } from '../controllers/tag';

const router = Router();

router.post('/', addTag);
router.get('/', getTags);    // get tags with name containing keyword /tags?name=:name             
router.get('/:tagId', getTag);
router.patch('/:tagId', patchTag); //Name and description
router.delete('/:tagId', deleteTag);

export default router;
