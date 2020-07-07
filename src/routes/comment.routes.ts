import { Router } from "express"; 
import * as commentController from "../controllers/comment.controller";
import { isLogin } from "../common/middlewares/verify";
import { isAdmin } from "../common/middlewares/isAdmin";

const router = Router(); 

router.route('/:post_id').get(isLogin, isAdmin, commentController.getAll);
router.route('/:post_id').post(isLogin, commentController.createComment);
router.route('/:post_id/:comment_id').get(isLogin, isAdmin, commentController.getById);
router.route('/:post_id/:comment_id').delete(isLogin, commentController.deleteComment);
router.route('/:post_id/:comment_id').put(isLogin, commentController.updateComment);

export default router;