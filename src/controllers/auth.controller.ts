import express from "express";
import { Request, Response } from "express";
import bcryipt from "bcryptjs"; 
import { IUser } from '../interfaces/user.interface';
import { status } from "../config/http_constants";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";
import { User } from "../models/user.model";
import logger from "../common/logger";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { stat } from "fs";

// Terminar con los metodos de jwt. 
export const signup = async (req: Request, res: Response) => {
    try {
        // saving a new user
        const user: IUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        
        user.password = await userService.encryptPassword(user.password); 
        const saved = await userService.saveUser(user); 
        
        if (!saved) {
            res.sendStatus(status.INTERNAL_SERVER_ERROR);
        }
        const insertId = saved.insertId;

        // token
        const token: string = jwt.sign({_id: insertId}, config.secret); 
        
        res.header("auth-token", token).json({
            insertId,
            ...user
        });
    } catch (error) {
        logger.error("Error saving user ", error);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await userService.findOne(req.body.email);
        if (!user) return res.status(status.BAD_REQUEST).send("Email or password incorrect!"); 

        const verify = await userService.checkCredentials(req.body.password, user.password);
        if (verify === false) return res.status(status.BAD_REQUEST).send("Password inserted is incorrect!");

        const token: string = jwt.sign({_id: user.id}, config.secret, {
            expiresIn: "12h"
        }); 
        
        res.header("auth-token", token).json(user);
    } catch (error) {
        logger.error("Error saving user ", error);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
}

export const profile = async (req: Request, res: Response) => {
    try {
        /* const user = await userService.findById(req.userId); 

        if (!user) return res.status(status.BAD_REQUEST).send("User dont exist"); 
        res.status(status.OK).json(user); */
    } catch (error) {
        logger.error("Error Accessing to profile ", error);
        throw error; 
    }
}