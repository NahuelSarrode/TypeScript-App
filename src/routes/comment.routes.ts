import { Router } from "express"; 
import * as commentController from "../controllers/comment.controller";

const router = Router(); 

router.route('/:post_id')
    .get(commentController.getAll);

router.route('/:post_id')
    .post(commentController.createComment);

export default router;