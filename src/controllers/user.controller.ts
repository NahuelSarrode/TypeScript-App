import { Request, Response, Router } from "express"; 
import * as userService from "../services/user.service"; 
import logger  from "../common/logger"; 
import { status } from "../config/http_constants";

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAll(); 

        if (!users) {
            res.status(status.OK).send("There arent any user registered");
        }

        res.json(users);
    } catch(error) {
        logger.error("Error getting all users");
        throw error;
    }
}