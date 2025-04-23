const Post = require("../models/PostModel");
const errorHandler = require("../utils/Error");

const createPost=async(req,res,next)=>{
        if(!req.user.isAdmin){
                next(errorHandler(403,"you are not allowed to create a post"));
        }
        if(!req.body.title || !req.body.content){
                next(errorHandler(403,"Pelease fill all the fields."))
        }
        const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-z0-9]/g,'-');
        const newPost=new Post(
                {
                        ...req.body,
                        slug,
                        userId:req.user.id,
                }     
        );
        
        try{
             const savedPost= await newPost.save();
                res.status(200).json(savedPost);
        }catch(error){
                next(error.message)
        }
}
const getPosts =async (req,res,next)=>{
        try{
                const startIndex=parseInt(req.query.startIndex || 0);
                const limit=parseInt(req.query.limit || 9);
                const sortDirection=req.query.order==='acs'?1:-1;
                const posts=await Post.find({
                        ...(req.query.userId &&{userId:req.query.userId}),
                        ...(req.query.category &&{category:req.query.category}),
                        ...(req.query.slug &&{slug:req.query.slug}), 
                        ...(req.query.postId &&{_id:req.query.postId}),
                        ...(req.query.searchTerm && {
                                $or:[
                                        {title:{$regex:req.query.searchTerm,$options:'i'}},
                                        {content:{$regex:req.query.searchTerm,$options:'i'}},
                                ],
                        }),
        }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit);
        const totalPost=await Post.countDocuments();
        const now=new Date();
        const oneMonthAgo=new Date(
                now.getFullYear(),
                now.getMonth()-1,
                now.getDate()
        )
        const lastMonthPosts=await Post.countDocuments({
                createdAt:{$gte:oneMonthAgo},
        })
        res.status(200).json({
                posts,
                totalPost,
                lastMonthPosts
        })
        }catch(error){
                next(error)
        }
}

const deletePost =async (req,res,next)=>{
        if(!req.user.isAdmin || req.user.id!==req.params.userId){
                next(errorHandler(403,'you are not allowed to delete this post'));
        }
        try{
                await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('post has been deleted successfully');
        }catch(error){
                next(error);
        }
}
const UpdatePost=async (req,res,next)=>{
        if(!req.user.isAdmin || req.user.id!==req.params.userId){
                next(errorHandler(403,'you are not allowed to update this podt'));
        }
        try{
              const updatedPost=  await Post.findByIdAndUpdate(req.params.postId,{
                $set:{
                        title:req.body.title,
                        content:req.body.content,
                        category:req.body.category,
                        image:req.body.image
                }
              },{new:true});
        res.status(200).json(updatedPost);
        }catch(error){
                next(error);
        }

}

module.exports={createPost,getPosts,deletePost,UpdatePost};