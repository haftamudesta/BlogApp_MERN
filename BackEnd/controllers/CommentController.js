const Comment=require('../models/CommentModel');
const errorHandler = require('../utils/Error');

const createComment=async (req,res,next)=>{
        try{
                const {content,postId,userId}=req.body;
                if(userId !==req.user.id){
                        return next(errorHandler(403,"Unauthorized"));
                }
                const newComment=new Comment({
                        content,
                        postId,
                        userId,
                })
                await newComment.save();
                res.status(200).json(newComment);
        }catch(error){
                next(error)
        }
}

const getComments =async (req,res,next)=>{
        try{
                const comments=await Comment.find({postId:req.params.postId}).sort({
                        createdAt:-1,
                });
                //await comments.save();
                res.status(200).json(comments);
        }catch(error){
                next(error);
        }
}
const likeComments=async (req,res,next)=>{
        try{
                const comment=await Comment.findById(req.params.commentId);
                if(!comment){
                       return next(errorHandler(404,"comment not found"));
                }
                const userIndex=comment.likes.indexOf(req.user.id);
                if(userIndex===-1){//here -1 means does not exist
                        comment.numberOfLikes+=1;
                        comment.likes.push(req.user.id);
                }else{
                        comment.numberOfLikes-=1;
                        comment.likes.splice(userIndex,1)// here 1 means remove
                }
                await comment.save();
                res.status(200).json(comment);
        }catch(error){
                next(error)
        }
}

const editComments=async (req,res,next)=>{
        try{
                const comment=await Comment.findById(req.user.commentId);
                if(!comment){
                        return next(errorHandler(404,"comment not found"));
                 }
                 if(comment.userId!==req.user.id && !req.user.isAdmin){
                        return next(errorHandler(404,"you do not have permission to edit this comment"));    
                 }
                 const editedComment=await Comment.findByIdAndUpdate(
                        req.params.commentId,
                        {
                        content:req.body.content,
                        },
                        { new: true}
                 );
                 await editedComment.save();
                 res.status(200).json(editedComment);
                
        }catch(error){
                next(error)
        }
}

const deleteComments=async (req,res,next)=>{
  try{
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
                return next(errorHandler(404,"comment not found"));
         }
         if(comment.userId!==req.user.id && !req.user.isAdmin){
                return next(errorHandler(404,"you do not have permission to delete this comment"));    
         }
         await Comment.findByIdAndDelete(req.params.commentId);
         res.status(200).json("comment deleted successfully");
  }catch(error){
        next(error)
  }    
}

const getAllComments=async (req,res,next)=>{
        if(!req.user.isAdmin){
                return next(errorHandler(404,"you are not allowed to see all the comments"));
        }
        try{
                const startIndex=parseInt(req.query.startIndex)||0;
                const limit=parseInt(req.query.limit)||8;
                const sortDirection=req.query.sort==="desc"?-1:1;
                const comments=await Comment.find()
                .sort({createdAt:sortDirection})
                .skip(startIndex)
                .limit(limit);
                const totalComment=await Comment.countDocuments();
                const now=new Date();
                const oneMonthAgo=new Date(now.getFullYear(),now.getMonth()-1,now.getDate());
                const lastMonthComment=await Comment.countDocuments({createdAt:{$gte:oneMonthAgo}});
                res.status(200).json(comments,totalComment,lastMonthComment)
        }catch(error){
                next(error);
        }
}

module.exports={createComment,getComments,likeComments,editComments,deleteComments,getAllComments};