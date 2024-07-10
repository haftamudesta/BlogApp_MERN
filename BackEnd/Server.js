const express=require('express');
const dotenv=require('dotenv');
dotenv.config();//this should be before express
const DBConnection=require('./DBConnection')
const userRoutes=require('./routes/UserRoutes')
const authenticationRoutes=require('./routes/AuthoRoutes');
const postRoutes=require('./routes/PostRoutes');
const commentRoutes=require('./routes/CommentRoutes');
const cookieParser=require('cookie-parser');

const server=express();
 server.use(express.json());
 server.use(cookieParser());

const PORT=process.env.PORT || 5000;
server.use('/api/user',userRoutes);
server.use('/api/authentication',authenticationRoutes);
server.use('/api/post',postRoutes);
server.use('/api/comment',commentRoutes);

DBConnection();
server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

server.use((error,req,res,next)=>{
    const statusCode=error.statusCode || 500;
    const message=error.message ||"Internal servrt error";
    res.json({
        success:false,
        statusCode,
        message,
    });
    next();
})


