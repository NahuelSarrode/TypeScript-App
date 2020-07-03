import { Request, Response, NextFunction } from "express";
import { status } from "../../config/http_constants"; 
import * as userService from "../../services/user.service";
import { stat } from "fs";


export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
    const user_id = req.userId; 
    const user = await userService.findById(user_id);

    console.log(user); 

    next();
}