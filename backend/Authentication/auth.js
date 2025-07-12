const jwt=require("jsonwebtoken");
const UserModel=require('../Models/user');


exports.studentAuth=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(token){
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user=await UserModel.findById(decode.userId).select('-password');
            next();
        }else{
            return res.status(401).json({error:'No token,authentication denied'});
        }

    }catch(err){
        res.status(401).json({error:"Something went wrong in Authentication"});
    }
}


exports.adminFacultyAuth=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(token){
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user=await UserModel.findById(decode.userId).select('-password');

            if(req?.user?.role==="student"){
                throw new Error("You dont have access to this page");
            }
            next();
        }else{
            return res.status(401).json({error:'No token,authentication denied'});
        }

    }catch(err){
        res.status(401).json({error:"Something went wrong in Authentication"});
    }
}