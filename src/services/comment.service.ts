import squel from "squel";
import { status } from "../config/http_constants";
import pool from "../database";
import logger from "../common/logger";
import { IComment } from "../interfaces/comment.interface";

export const getAll = async (params: string) => {
    try {
        const query = squel.select()
            .from("comment")
            .field("id")
            .field("user_id")
            .field("post_id")
            .field("text")
            .field("created_at")
            .field("image_url")
            .where("post_id = ?", params);

        const preparedQuery = query.toParam(); 
        const [ comments ] = await pool.query(preparedQuery.text, preparedQuery.values);

        const temp = Object.values(comments); 

        if (!temp || !temp.length) return null; 

        return JSON.parse(JSON.stringify(comments));
    } catch (error) {
        logger.error("Cant execute query: ", error);
        throw error;
    }
}

// TODO: vincular al usuario id en el registro guardado, por ahora está harcodeado. 
export const createComment = async (post: string, params: IComment) => {
    try {
        const query = squel.insert()
            .into("comment")
            .set("post_id", post)
            .set("text", params.text)
            .set("user_id", 1)
            .set("image_url", params.image_url);

        const preparedQuery = query.toParam(); 
        const [ comment ] = await pool.query(preparedQuery.text, preparedQuery.values); 

        const temp = Object.values(comment); 

        if (!temp || !temp.length) return null;

        const comm = JSON.parse(JSON.stringify(comment));

        return comm[0];
    } catch (error) {
        logger.error("Cant execute query: ", error);
        throw error;
    }
}

export const getById = async (params: string) => {
    try {
        const query = squel.select()
            .from("comment")
            .field("text")
            .field("user_id")
            .field("post_id")
            .field("created_at")
            .where("id = ?", params);

        const preparedQuery = query.toParam();
        const [ row ] = await pool.query(preparedQuery.text, preparedQuery.values);

        const temp = Object.values(row);

        if (!temp || !temp.length) {
            return null;
        }

        const comment = JSON.parse(JSON.stringify(row)); 

        return comment[0]; 
    } catch (error) {
        logger.error("Cant execute query: ", error);
        throw error;
    }
}

export const deleteComment = async (post: string, comment: string) => {
    try {
        const query = squel.delete()
            .from("comment")
            .where("id = ?", comment)
            .where("post_id = ?", post); 

        const preparedQuery = query.toParam();
        await pool.query(preparedQuery.text, preparedQuery.values);
    } catch (error) {
        logger.error("Cant execute query ", error);
        throw error;
    }
}

export const updateComment = async (params: IComment) => {
    try {
        const query = squel.update()
            .table("comment")
            .set("text", params.text)
            .set("image_url", params.image_url)
            .where("id = ?", params.id); 

        const preparedQuery = query.toParam();
        await pool.query(preparedQuery.text, preparedQuery.values);
    } catch (error) {
        logger.error("Cant execute query", error);
        throw error; 
    }
}