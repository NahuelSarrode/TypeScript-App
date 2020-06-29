import { Request, Response } from "express";
import { Post } from "../interfaces/post.interface";
import logger from "../common/logger";
import pool from "../database"; 

export async function exist(params: string) {
    try {
        var temp: Array<string> = []
        const [ post ] = await pool.query("SELECT * FROM post WHERE id = ?", params)
    
        temp = Object.values(post)

        if (!temp || !temp.length) {
            return null
        }

        return temp
    } catch (error) {
        logger.error("Cant get id", error)
        throw error
    }
}

export async function getPostsService() {
    try { 
        const rows = await pool.query("SELECT * FROM post") 

        if (!rows || !rows.length) {
            return null
        }

        return rows[0]
    } catch (error) {
        logger.error('Cant execute query ', error)
        throw error
    }
}

export async function createPostService(params: Post) {
    try { 
        const post = await pool.query("INSERT INTO post SET ?", params)
        
        if (!post || !post.length) {
            return null
        }

        return post.lastIndexOf
    } catch (error) {
        logger.error('Cant execute query ', error) 
        throw error
    }
}

export async function getPostService(params: string) {
    try {

        const [result] = await pool.query('SELECT * FROM post WHERE id = ?', params) 

        if (!result) {
            return null
        }

        return result
    } catch (error) {
        logger.error('Cant execute query ', error) 
        throw error
    }
}

export async function deletePostService(params: string) {
    try {
        await pool.query("DELETE FROM post WHERE id = ?", params)
    } catch (error) {
        logger.error("Cant execute query ", error)
        throw error
    }
}

export async function updatePostService(params_id: string, params: Post) {
    try {
        await pool.query('UPDATE post SET ? WHERE id = ?', [params, params_id])
    } catch (error) {
        logger.error('Cant execute query', error)
        throw error
    }
}