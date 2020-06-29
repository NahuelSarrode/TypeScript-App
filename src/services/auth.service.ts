import { IUser } from "../interfaces/user.interface";
import { config } from "../config/config";
import pool from "../database"; 
import logger from "../common/logger";

export const exist = async (params: IUser) => {
    try {
        const [ result ] = await pool.query("SELECT * FROM user WHERE email = ?", params.email)
        const temp = Object.keys(result); 

        if (!temp || !temp.length) {
            return null
        }

        return result
    } catch (error) {
        logger.error("Cant execute query: ", error);
        throw error;        
    }
}