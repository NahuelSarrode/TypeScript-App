import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { status } from "../../config/http_constants";
import { config } from "../../config/config";
import { IPayload } from "../../interfaces/payload.interface";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("auth-token");

    if (!token) return res.status(status.UNAUTHORIZED).send("Access Denied!"); 
    
    const payload = jwt.verify(token, config.secret) as IPayload;

    // req.userId = payload.id

    next();
}