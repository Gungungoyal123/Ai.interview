import User from "../models/usermodel.js";

export const signup=async(req,res)=>{
    try {
       const {email,password}=req.body;
       if(!email || !password){
         return res.status(400).json({success:false,message:"Incomplete info"});
       } 
       const user=await User.findOne({email});
       if(user){
        return res.status(400).json({success:false,message:"User already registered"});
       }
       await User.create({email,password});
        return res.status(201).json({success:true,message:"User successfully created"});
    } catch (error) {
        console.log(error.stack);
         return res.status(500).json({message:"server errror",error:error.message});
    }
}