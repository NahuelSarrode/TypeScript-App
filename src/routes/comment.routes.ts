import { Router } from "express"; 
import * as commentController from "../controllers/comment.controller";
import { runInContext } from "vm";

const router = Router(); 

router.route('/:post_id').get(commentController.getAll);
router.route('/:post_id').post(commentController.createComment);
router.route('/:post_id/:comment_id').get(commentController.getById);
router.route('/:post_id/:comment_id').delete(commentController.deleteComment);
router.route('/:post_id/:comment_id').put(commentController.updateComment);

export default router;