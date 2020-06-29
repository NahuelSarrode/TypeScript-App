import { Router } from "express";
import { signin, signup, profile } from "../controllers/auth.controller";
import { verifyToken } from "../common/middlewares/verify";

const router = Router(); 

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.get('/profile', verifyToken, profile); 

export default router;