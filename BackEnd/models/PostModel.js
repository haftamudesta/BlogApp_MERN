const mongoose=require('mongoose');

const PostSchema=mongoose.Schema({
        userId:{
                type:String,
                require:true,
        },

        content:{
                type:String,
                require:true
        },
        title:{
                type:String,
                require:true,
                unique:true,
        },
        image:{
                type:String,
                default:'https://media.sproutsocial.com/uploads/2019/09/how-to-write-a-blog-post.svg'
        },
        category:{
                type:String,
                default:'uncatagrized',
        },
        slug:{
                type:String,
                require:true,
                unique:true,
        }
},{timestamps:true})

const Post=mongoose.model('Post',PostSchema);

module.exports=Post;
