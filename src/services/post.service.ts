import { Request, Response } from "express";
import { Post } from "../interfaces/post.interface";
import logger from "../common/logger";
import { connect } from "../database"; 


// TODO: resolver como transformar un objeto en array para poder verificar que el id exista. 
// https://www.cloudhadoop.com/2018/08/typescript-how-to-convert-object-to.html
export async function exist(params: string) {
    try {
        var temp: Array<string> = []
        const conn = await connect()
        const [ post ] = await conn.query("SELECT id FROM post WHERE id = ?", params)
        temp = Object.values(post)

        return temp
    } catch (error) {
        logger.error("Cant get id", error)
        throw error
    }
}

export async function getPostsService() {
    try {
        const conn = await connect() 
        const rows = await conn.query("SELECT * FROM post") 

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
        const conn = await connect() 
        const post = await conn.query("INSERT INTO post SET ?", params)
        
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
        const conn = await connect()
        const [result] = await conn.query('SELECT * FROM post WHERE id = ?', params) 

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
        const conn = await connect()
        await conn.query("DELETE FROM post WHERE id = ?", params)
    } catch (error) {
        logger.error("Cant execute query ", error)
        throw error
    }
}

export async function updatePostService(params_id: string, params: Post) {
    try {
        const conn = await connect()
        await conn.query('UPDATE post SET ? WHERE id = ?', [params, params_id])
    } catch (error) {
        logger.error('Cant execute query', error)
        throw error
    }
}