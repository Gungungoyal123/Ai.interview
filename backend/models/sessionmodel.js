import mongoose from "mongoose";
const sessionschema=new mongoose.Schema({
    userId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
    },
    role: String,
  experience: String,
  techStack: String,
  difficulty: String,
  companyType: String,
  interviewType: String,
  conversationHistory:[
    {
        role:String,
    content:String
    }
  ],
  status:{
    type:String,
    default:"active"
  }

},{timestamps:true});
export const Session=mongoose.model("Session",sessionschema);
