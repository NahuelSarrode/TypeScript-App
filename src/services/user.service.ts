import { IUser } from "../interfaces/user.interface";
import { config } from "../config/config";
import pool from "../database"; 
import logger from "../common/logger";
import squel from "squel";
import bcrypt from "bcryptjs";

export const saveUser = async (params: IUser) => {
    try {
        const query = squel.insert()
            .into("user")
            .set("username", params.username)
            .set("email", params.email)
            .set("password", params.password);

        const preparadQuery = query.toString();
        const [ insertId ] = await pool.query(preparadQuery);

        return JSON.parse(JSON.stringify(insertId));
    } catch (error) {
        logger.error("Cant execute query ", error); 
        throw error; 
    }
}

export const encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10); 

    return bcrypt.hash(password, salt);
}

export async function findOne(params: string) {
    try {
        const query = squel.select()
            .from("user")
            .field("id")
            .field("username")
            .field("email")
            .field("role")
            .field("password")
            .where("email = ?", params);

        const preparadQuery = query.toString(); 
        const [ result ] = await pool.query(preparadQuery);  
        
        const temp = Object.values(result); 

        if (!temp || !temp.length) {
            return null
        }

        const user = JSON.parse(JSON.stringify(result));
        
        return user[0]; 
    } catch (error) {
        logger.error("cant execute query ", error);
        throw error; 
    }
}

export const checkCredentials = async (pass: string, userPassword: string): Promise<boolean> => {
    try {
        const result = await bcrypt.compare(pass, userPassword);

        return result;
    } catch (error) {
        logger.error("cant execute query ", error);
        throw error;   
    }    
}

export const findById = async (params: string) => {
    try {
        const query = squel.select() 
            .from("user")
            .field("username")
            .field("email") 
            .field("role")
            .where("id = ?", params) 

        const preparadQuery = query.toParam(); 
        const [ user ] = await pool.query(preparadQuery.text, preparadQuery.values);
        
        // Verify if that user has a value. 
        const temp = Object.values(user);
        // if not return null. 
        if (!temp || !temp.length) {
            return null
        }

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        logger.error("cant execute query ", error);
        throw error; 
    }
}
