import { Router } from "express";
import { signin, signup, profile } from "../controllers/auth.controller";

const router = Router(); 

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/profile').get(profile);

export default router;