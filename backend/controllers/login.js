import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
export const login=async(req,res)=>{
   try {
     const{email,password}=req.body;
      if(!email || !password){
         return res.status(400).json({success:false,message:"Incomplete info"});
       } 
       const user=await User.findOne({email});
       if(!user){
        return res.status(400).json({success:false,message:"User not registered"});
       }
       const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
         return res.status(400).json({success:false,message:"Incorrect password"});
      }
        return res.status(201).json({success:true,message:"successfully login"});
   } catch (error) {
    return res.status(500).json({success:true,error:error.message});
   }
   


}