const jwt=require('jsonwebtoken');
const errorHandler=require('./Error');

const verifyToken=(req,res,next)=>{
        const token=req.cookies.access_token;
        if(!token){
                return errorHandler(401,"Unauthorized");
        }
        jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
                if(error){
                   return errorHandler(401,"Unauthorized")    
                }
                req.user=user;
                next();
        });
}

module.exports=verifyToken;