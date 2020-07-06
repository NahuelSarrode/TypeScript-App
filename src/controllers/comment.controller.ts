import { Request, Response } from "express";
import logger from "../common/logger";
import { status } from "../config/http_constants";
import * as postService from "../services/post.service";
import * as commentService from "../services/comment.service";
import { IComment } from "../interfaces/comment.interface";
import { stat } from "fs/promises";


export const getAll = async (req: Request, res: Response) => {
    try {
        const { post_id } = req.params;
        const post = await postService.exist(post_id);

        if (!post) return res.status(status.BAD_REQUEST).send("Not exist this post, please check your id and try again");

        const comments = await commentService.getAll(post_id);

        if (!comments) return res.status(status.OK).send("There arent any comment");

        res.status(status.OK).json(comments);
    } catch (error) { 
        logger.error("Error Getting comments", error);
        throw error;
    }
}

export const createComment = async (req: Request, res: Response) => {
    try {
        const { post_id } = req.params;
        const newComment: IComment = req.body; 
        const post = await postService.exist(post_id)
        
        if (!post) return res.status(status.BAD_REQUEST).send("The Id post inserted are incorrect"); 

        const result = await commentService.createComment(post_id, newComment);

        res.sendStatus(status.CREATED).json(result);
    } catch (error) {
        logger.error("Error Getting comments", error);
        throw error;
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { post_id, comment_id } = req.params; 

        const post = await postService.exist(post_id);

        if (!post) { 
            res.status(status.BAD_REQUEST).send("this post not exist"); 
        }

        const comment = await commentService.getById(comment_id);

        if (!comment) {
            res.status(status.BAD_REQUEST).send("Dont exist these coment on the post selected");
        }

        res.status(status.OK).json(comment);
    } catch (error) {
        logger.error("Error Getting comments", error);
        throw error;
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { post_id, comment_id } = req.params; 

        const post = await postService.exist(post_id);

        if (!post) {
            res.status(status.BAD_REQUEST).send("This post dont exist"); 
        }

        const comment = await commentService.getById(comment_id); 
        
        if (!comment) {
            res.status(status.BAD_REQUEST).send("This comment dont exist");
        }

        await commentService.deleteComment(post_id, comment_id);

        res.sendStatus(status.OK);
    } catch (error) {
        logger.error("Error deleting the comment ", error);
        throw error;
    }
}

export const updateComment = async (req: Request, res: Response) => {
    try {
        const { post_id, comment_id } = req.params; 
        const post = await postService.exist(post_id);

        if (!post) return res.status(status.BAD_REQUEST).send("This post dont exist");

        const comment = await commentService.getById(comment_id);
        
        if (!comment) return res.status(status.BAD_REQUEST).send("This comment dont exist"); 
        
        const updcomment: IComment = req.body;
        updcomment.post_id = post_id; 
        updcomment.id = comment_id;

        await commentService.updateComment(updcomment);

        res.sendStatus(status.OK);

    } catch (error) {
        logger.error("Error deleting comment", error);
        throw error; 
    }
}