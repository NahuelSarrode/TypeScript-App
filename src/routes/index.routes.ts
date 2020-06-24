import { Router } from "express";
import indexcontroller from "../controllers/index.controller";

const router = Router() 

router.route('/').get(indexcontroller)

export default router