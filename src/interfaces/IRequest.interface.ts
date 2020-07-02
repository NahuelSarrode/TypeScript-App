import * as express from "express"; 

export interface IRequest extends Request {
    userId: string
}