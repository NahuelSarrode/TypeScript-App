import { Request, Response, Router } from "express" 

export default function welcome(req: Request, res: Response) {
    return res.json("Welcome to my apy typrescript")
}
