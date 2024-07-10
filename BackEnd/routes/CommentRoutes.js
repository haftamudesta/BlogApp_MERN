const express=require('express');
const {createComment,getComments,likeComments,editComments,deleteComments,getAllComments}
=require('../controllers/CommentController');
const verifyToken=require('../utils/verifyUser')


const route=express.Router();
route.post('/create',verifyToken,createComment);
route.get('/getCommnts/:postId',getComments);
route.put('/likeComment/:commentId',verifyToken,likeComments);
route.put('/editComment/:commentId',verifyToken,editComments);
route.delete('/deleteComment/:commentId',verifyToken,deleteComments);
route.get('/getCommnts',verifyToken,getAllComments);

module.exports=route;