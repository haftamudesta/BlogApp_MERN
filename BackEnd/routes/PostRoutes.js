const express=require('express');
const verifyToken=require('../utils/verifyUser');
const {createPost,test,getPosts,deletePost,UpdatePost}=require('../controllers/PostController')

const router=express.Router();
router.post('/create',verifyToken,createPost);
router.get('/getPosts',getPosts);
router.delete('/deletePost/:postId/:userId',verifyToken,deletePost);
router.put('/updatePost/:postId/:userId',verifyToken,UpdatePost);

module.exports=router;