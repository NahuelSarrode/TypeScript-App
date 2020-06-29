import { Request, Response } from "express";
import logger from "../common/logger";
import { status } from "../config/http_constants"; 
import { Post } from "../interfaces/post.interface";
import * as postService from "../services/post.service";

export async function getPosts(req: Request, res: Response) {
    try {
        const posts = await postService.getPostsService()

        res.status(status.OK).json(posts)
    } catch (error) {
        logger.error('Error getting posts ', error)
        res.sendStatus(status.INTERNAL_SERVER_ERROR)
    }
}

export async function createPost(req: Request, res: Response) {
    try {
        const newPost: Post = req.body
        const insert = await postService.createPostService(newPost)

        res.sendStatus(status.CREATED)
    } catch (error) {
        logger.error('Error getting posts ', error)
        res.sendStatus(status.INTERNAL_SERVER_ERROR)
    }
}

export async function getPost(req: Request, res: Response) {
    try {
        const { post_id } = req.params
        const exist = await postService.exist(post_id) 

        if (!exist) {
            res.sendStatus(status.BAD_REQUEST)
        }
        const post = await postService.getPostService(post_id) 

        res.status(status.OK).json(post)
        
    } catch (error) {
        logger.error("Error getting post by id" , error)
        res.sendStatus(status.INTERNAL_SERVER_ERROR)
    }
}

export async function deletePost(req: Request, res: Response) {
    try {
        const { post_id }   = req.params
        postService.deletePostService(post_id)

        res.sendStatus(status.OK)
    } catch (error) {
        logger.error("Error deleting the post ", error)
        res.sendStatus(status.INTERNAL_SERVER_ERROR)
    }
}

export async function updatePost(req: Request, res: Response) {
    try {
        const { post_id } = req.params
        const post: Post = req.body 
        await postService.updatePostService(post_id, post)

        res.sendStatus(status.OK)
    } catch (error) {
        logger.error("Error Updating the post selected ", error)
        res.sendStatus(status.INTERNAL_SERVER_ERROR)
    }
}