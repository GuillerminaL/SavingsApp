import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

import { get500 } from './error';
import Tag from '../models/tag';
import Saving from '../models/saving';

type RequestBody = { name: string, description: string };

/**
 * Function getTags: 
 *      - Returns all tags or tags whose name contains the specified name keyword
 * @param req Optional query param: name
 * @param res res.status().json{message} | res.status(200).json{message, tags: []}
 * @returns 404 - There´s no tag named as specified
 *          200 - All existing tags
 *          200 - Tags filtered by 'name' containing the provided keyword (optional query param)
 */
export async function getTags(req:Request, res:Response, next: NextFunction) {
    const enteredName = req.query.name as string;
    try {
        if ( enteredName ) {
            const regex = new RegExp(enteredName, 'i') // i for case insensitive
            const tags = await Tag.find({ name: {$regex: regex} });
            if ( ! tags ) {
                return res.status(500).json({message: `Something went wrong... We are working hard to solve it!`});   
            }
            if ( tags.length === 0 ) {
                return res.status(404).json({message: `There's no tag with name containing '${enteredName}'`, tags: tags }); 
            }
            return res.status(200).json({tags: tags});
        } 
        const tags = await Tag.find();
        if ( ! tags ) {
            return res.status(404).json({ 
                message: 'No tags where found' 
            });
        }
        return res.status(200).json({tags: tags});  
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

export async function getTag(req:Request, res:Response, next: NextFunction) {
    const tagId = req.params.tagId;
    try {
        if ( ! isValidObjectId(tagId) ) {
            return res.status(400).json({message: `Tag id ${tagId} is not a valid id`}); 
        }
        const tag = await Tag.findById(tagId);
        if ( ! tag ) {
            return res.status(404).json({message: `Tag id ${tagId} not found`});   
        }
        return res.status(200).json({tag: tag});
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

/**
 * Function addTag:
 * @param req Body: name and description required. Name must be unique
 * @param res res.status().json{message} | res.status(200).json{message, tag: newTag}
 * @returns 400 - Must specify tag name and description
 *          400 - Name must be unique
 *          500 - Internal error
 *          201 - New tag created
 */
export async function addTag(req:Request, res:Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const enteredName = body.name as string;
    const enteredDescription = body.description as string;
    try {
        //Checks inputs...
        if ( ! enteredName ) {
            return res.status(400).json({message: `Must specify a tag name`});
        }
        if ( ! enteredDescription ) {
            return res.status(400).json({message: `Must specify a tag description`});
        }
        //Check name existence...
        const checkName = await Tag.find({ name: enteredName });
        if ( checkName.length !== 0 ) {
            return res.status(400).json({ 
                message: `Already exists a tag named ${enteredName}` 
            });
        }
        //Saves and returns...
        const tag = new Tag({
            name: enteredName, 
            description: enteredDescription
        });
        const newTag = await tag.save();
        if ( ! newTag ) {
            return res.status(500).json({ 
                message: 'Something went wrong... We are working hard to solve it!' 
            });
        }
        return res.status(201).json({ message: 'Added Tag', newTag: newTag });        
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

/**
 * Function patchTag:
 *      - Allows to patch name and/or description
 * @param req Params: tagId, Body: name and/or description (not empty, unique name)
 * @param res res.status().json{message} | res.status(200).json{message, tag: tag}
 * @returns 400 - Invalid id
 *          404 - Not found
 *          400 - Must specify new name and/or new description
 *          400 - Existing name
 *          200 - Updated tag
 */
export async function patchTag(req:Request, res:Response, next: NextFunction) {
    const tagId = req.params.tagId;
    try {
        if ( ! isValidObjectId(tagId) ) {
            return res.status(400).json({message: `Tag id ${tagId} is not a valid id`}); 
        }
        //Checks tag existence...
        const toPatchTag = await Tag.findById(tagId);
        if ( ! toPatchTag ) {
            return res.status(404).json({message: `Tag id ${tagId} does not exist`});
        }
        //Checks input...
        const enteredName = req.body.name as string | null;
        const enteredDescription = req.body.description as string | null;
        if ( !enteredName && !enteredDescription ) {
            return res.status(400).json({
                message: `Must specify the tag attribute to edit: name and/or description)`
            });
        }
        if ( enteredName ) {
            if ( enteredName === "" ) {
                return res.status(400).json({message: `Must specify a tag name`});
            }
            const checkName = await Tag.find({ name: enteredName });
            if ( checkName.length !== 0 ) {
                return res.status(400).json({ 
                    message: `Already exists a tag named ${enteredName}` 
                });
            }
            toPatchTag.name = enteredName;
        }
        if ( enteredDescription ) {
            toPatchTag.description = enteredDescription;
        }
        //Saves and returns...
        const patchedTag = await toPatchTag.save();
        if ( ! patchedTag ) {
            return res.status(500).json({ 
                message: 'Something went wrong... We are working hard to solve it!' 
            });
        }
        res.status(200).json({ message: 'Updated Tag', patchedTag: patchedTag });
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

/**
 * Function deleteTag:
 * @param req tagId
 * @param res res.status().json{message} | res.status(200).json{message, deletedTag: deletedTag}
 * @returns 400 - Invalid Id
 *          409 - Has related savings
 *          404 - Not found
 *          200 - Deleted 
 */
export async function deleteTag(req:Request, res:Response, next: NextFunction) {
    const tagId = req.params.tagId;
    try {
        if ( ! isValidObjectId(tagId) ) {
            return res.status(400).json({message: `Tag id ${tagId} is not a valid id`}); 
        }
        //Checks related savings existence (active or inactive)...
        const checkTagSavings = await Saving.findOne({ tag: tagId });
        if ( checkTagSavings ) {
            return res.status(409).json({
                message: `Can not remove Tag id ${tagId}. It has related savings`
            });
        }
        //Deletes and returns...
        const deletedTag = await Tag.findByIdAndDelete(tagId);
        if ( ! deletedTag ) {
            return res.status(404).json({message: `Tag id ${tagId} not found`});
        }                
        res.status(200).json({message: `Tag deleted`, deletedTag: deletedTag });
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}