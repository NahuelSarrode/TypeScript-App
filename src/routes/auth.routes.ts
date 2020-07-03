import { Router } from "express";
import { signin, signup, profile } from "../controllers/auth.controller";
import { isLogin } from "../common/middlewares/verify";

const router = Router(); 

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.get('/profile', isLogin, profile); 

export default router;