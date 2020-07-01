import { Request, Response } from "express";
import squel from "squel";
import { Post } from "../interfaces/post.interface";
import logger from "../common/logger";
import pool from "../database"; 

export async function exist(params: string) {
    try {
        var temp: Array<string> = []

        const query = squel.select()
            .from("post")
            .field("id")
            .field("title")
            .field("description")
            .field("image_url")
            .field("created_at")
            .where("id = ?", params); 

        const prepraredQuery = query.toParam();
        const [ row ] = await pool.query(prepraredQuery.text, prepraredQuery.values); 
    
        temp = Object.values(row)

        if (!temp || !temp.length) {
            return null
        }

        return JSON.parse(JSON.stringify(row)); 
    } catch (error) {
        logger.error("Cant get id", error)
        throw error
    }
}

export async function getPostsService() {
    try { 
        var verify: Array<string> = [];

        const query = squel.select()
            .from("post")
            .field("id")
            .field("title")
            .field("description")
            .field("image_url")
            .field("created_at");

        const prepraredQuery = query.toParam();
        const [ rows ] = await pool.query(prepraredQuery.text, prepraredQuery.values); 

        verify = Object.values(rows);
    
        if (!verify || !verify.length) {
            return null; 
        }

        return rows;
    } catch (error) {
        logger.error('Cant execute query ', error)
        throw error
    }
}

export async function createPostService(params: Post) {
    try { 
        const query = squel.insert() 
            .into("post")
            .set("title", params.title)
            .set("description", params.description)
            .set("image_url", params.image_url)

        const prepraredQuery = query.toParam(); 
        await pool.query(prepraredQuery.text, prepraredQuery.values);
    } catch (error) {
        logger.error('Cant execute query ', error) 
        throw error
    }
}

export async function deletePostService(params: string) {
    try {
        const query = squel.delete() 
            .from("post")
            .where("id = ?", params);

        const prepraredQuery = query.toParam(); 
        await pool.query(prepraredQuery.text, prepraredQuery.values);
    } catch (error) {
        logger.error("Cant execute query ", error)
        throw error
    }
}

export async function updatePostService(params_id: string, params: Post) {
    try {
        const query = squel.update()
            .table("post")
            .set("title", params.title)
            .set("description", params.description)
            .set("image_url", params.image_url)

        const prepraredQuery = query.toParam();
        await pool.query(prepraredQuery.text, prepraredQuery.values);
    } catch (error) {
        logger.error('Cant execute query', error)
        throw error
    }
}