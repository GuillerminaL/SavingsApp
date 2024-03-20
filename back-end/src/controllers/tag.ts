import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

import { get500 } from './error';
import Tag from '../models/tag';
import Saving from '../models/saving';


type RequestBody = { name: string, description: string | null };

export async function getTags(req:Request, res:Response, next: NextFunction) {
    try {
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

export async function addTag(req:Request, res:Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const enteredName = body.name;
    try {
        //Checks name input...
        if ( ! enteredName ) {
            return res.status(400).json({message: `Must specify a tag name`});
        }
        const checkName = await Tag.find({ name: enteredName });
        if ( checkName.length !== 0 ) {
            return res.status(400).json({ 
                message: `Already exists a tag named ${enteredName}` 
            });
        }
        //Saves and returns...
        const tag = new Tag({
            name: enteredName, 
            description: body.description
        });
        const newTag = await tag.save();
        if ( ! newTag ) {
            return res.status(500).json({ 
                message: 'Something went wrong... We are working hard to solve it!' 
            });
        }
        return res.status(201).json({ message: 'Added Tag', tag: newTag });        
    } catch (error) {
        console.log(error);
        get500(req, res, next);
    }
}

export async function patchTag(req:Request, res:Response, next: NextFunction) {
    const tagId = req.params.tagId;
    try {
        if ( ! isValidObjectId(tagId) ) {
            return res.status(404).json({message: `Tag id ${tagId} is not a valid id`}); 
        }
        //Checks tag existence...
        const toPatchTag = await Tag.findById(tagId);
        if ( ! toPatchTag ) {
            return res.status(400).json({message: `Tag id ${tagId} does not exist`});
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

export async function deleteTag(req:Request, res:Response, next: NextFunction) {
    const tagId = req.params.tagId;
    try {
        if ( ! isValidObjectId(tagId) ) {
            return res.status(404).json({message: `Tag id ${tagId} is not a valid id`}); 
        }
        //Checks related savings existence (active or inactive)...
        const tagSavings = await Saving.findOne({ tag: tagId });
        if ( tagSavings ) {
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