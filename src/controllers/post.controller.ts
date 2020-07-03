import { Request, Response } from "express";
import logger from "../common/logger";
import { status } from "../config/http_constants"; 
import { Post } from "../interfaces/post.interface";
import * as postService from "../services/post.service";
import * as userService from "../services/user.service";

export async function getPosts(req: Request, res: Response) {
    try {
        const posts = await postService.getPostsService()

        res.status(status.OK).json(posts)
    } catch (error) {
        logger.error('Error getting posts ', error)
        res.sendStatus(status.INTERNAL_SERVER_ERROR)
    }
}

export async function createPost(req: any, res: Response) {
    try {
        const newPost: Post = req.body; 
        newPost.user_id = req.userId;

        await postService.createPostService(newPost)

        res.sendStatus(status.CREATED)
    } catch (error) {
        logger.error('Error getting posts ', error)
        res.sendStatus(status.INTERNAL_SERVER_ERROR)
    }
}

export async function getPost(req: Request, res: Response) {
    try {
        const { post_id } = req.params;
        const exist = await postService.exist(post_id) ;

        if (!exist) {
            res.sendStatus(status.BAD_REQUEST);
        }

        res.status(status.OK).json(exist);
        
    } catch (error) {
        logger.error("Error getting post by id" , error);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
}

export async function deletePost(req: any, res: Response) {
    try {
        const { post_id }   = req.params; 
        const post: Post = await postService.exist(post_id);

        if (!post) {
            res.status(status.BAD_REQUEST).send("Cant eliminate a post that not exist");
        }

        const user = req.userId;

        if (user !== post.user_id) {
            res.status(status.UNAUTHORIZED).send("An user can delete your own post, not from others users");
        }
    
        await postService.deletePostService(post_id);

        res.sendStatus(status.OK);
    } catch (error) {
        logger.error("Error deleting the post ", error)
        res.sendStatus(status.INTERNAL_SERVER_ERROR)
    }
}

export async function updatePost(req: any, res: Response) {
    try {
        const { post_id } = req.params

        const exist: Post = await postService.exist(post_id);
        
        if (!exist) {
            res.status(status.BAD_REQUEST).send("You are trying to update a post that not exist");
        }

        console.log(exist);

        const user = req.userId;

        if (user !== exist.user_id) {
            res.status(status.UNAUTHORIZED).send("An user can update your own post");
        }

        const post: Post = req.body 
        await postService.updatePostService(post_id, post)

        res.sendStatus(status.OK)
    } catch (error) {
        logger.error("Error Updating the post selected ", error)
        res.sendStatus(status.INTERNAL_SERVER_ERROR)
    }
}