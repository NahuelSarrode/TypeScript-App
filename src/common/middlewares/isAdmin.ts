import { Request, Response, NextFunction } from "express";
import * as userService from "../../services/user.service";


export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
    const user_id = req.userId; 
    const user = await userService.findById(user_id);

    if (user.role !== 'Admin') return res.send('You must be a administrator for this action'); 
    console.log(user.role);
    next();
}