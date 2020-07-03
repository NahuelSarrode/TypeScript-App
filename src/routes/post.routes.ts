import { Router } from "express";
import { getPosts, createPost, getPost, deletePost, updatePost } from "../controllers/post.controller"; 
import { isLogin } from "../common/middlewares/verify";

const router = Router()

router.route('/')
    .get(isLogin, getPosts)
    .post(isLogin, createPost)

router.route('/:post_id') 
    .get(isLogin, getPost)
    .delete(isLogin, deletePost)
    .put(isLogin, updatePost)

export default router