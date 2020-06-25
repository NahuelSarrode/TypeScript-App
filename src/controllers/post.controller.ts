import { Request, Response } from "express";
import { connect } from "../database";
import logger from "../common/logger"; 
import { Post } from "../interfaces/post.interface";
import * as postService from "../services/post.service";

export async function getPosts(req: Request, res: Response) {
    try {
        const posts = await postService.getPostsService()

        return res.json(posts)
    } catch (error) {
        logger.error('Error getting posts ', error)
        throw error
    }
}

export async function createPost(req: Request, res: Response) {
    try {
        const newPost: Post = req.body
        const insert = postService.createPostService(newPost)

        return res.json(insert)
    } catch (error) {
        logger.error('Error getting posts ', error)
        throw error
    }
}

export async function getPost(req: Request, res: Response) {
    try {
        const { post_id } = req.params
        const exist = await postService.exist(post_id)
        const post = await postService.getPostService(post_id) 
    
        return res.json(post)
    } catch (error) {
        logger.error("Error getting post by id" , error)
        throw error
    }
}

export async function deletePost(req: Request, res: Response) {
    try {
        const { post_id }   = req.params
        postService.deletePostService(post_id)

        return res.json({
            message: 'The post has been deleted correctly'
        })
    } catch (error) {
        logger.error("Error deleting the post ", error)
        throw error
    }
}

export async function updatePost(req: Request, res: Response) {
    try {
        const { post_id } = req.params
        const post: Post = req.body 
        await postService.updatePostService(post_id, post)

        return res.json({
            message: 'post updated'
        })
    } catch (error) {
        logger.error("Error Updating the post selected ", error)
        throw error
    }
}