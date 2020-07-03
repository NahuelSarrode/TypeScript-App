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

export const createComment = async (post: string, params: IComment) => {
    try {
        const query = squel.insert()
            .into("comment")
            .set("post_id", params.post_id)
            .set("text", params.text)
            .set("image_url", params.image_url) 

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