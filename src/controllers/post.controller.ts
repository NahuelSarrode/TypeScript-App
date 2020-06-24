import { Request, Response } from "express";
import { connect } from "../database";
import { Post } from "../interfaces/post.interface";

export async function getPosts(req: Request, res: Response) {
    const conn = await connect() 
    const posts = await conn.query('SELECT * FROM post') 
    
    if (posts) {
        return res.json(posts[0])
    }
}

export async function createPost(req: Request, res: Response) {
    const newPost: Post = req.body
    const conn = await connect() 
    const result = await conn.query('INSERT INTO post SET ?', [newPost]);

    return res.json({
        message: 'post Created'
    })
}

export async function getPost(req: Request, res: Response) {
    const { id } = req.params 
    const conn = await connect() 
    const post = await conn.query('SELECT * FROM post WHERE id = ?', [id])

    return res.json(post[0])
}

export async function deletePost(req: Request, res: Response) {
    const { id } = req.params
    const conn = await connect() 
    await conn.query('DELETE FROM post WHERE id = ?', [id])

    return res.json({
        message: 'The post has been deleted correctly'
    })
}

export async function updatePost(req: Request, res: Response) {
    const { id } = req.params
    const post: Post = req.body 
    const conn = await connect()
    await conn.query('UPDATE post SET ? WHERE id = ?', [post, id])

    return res.json({
        message: 'post updated'
    })
}