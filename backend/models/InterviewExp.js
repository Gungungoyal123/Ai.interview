import mongoose from 'mongoose';
const ExpusereinfoSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String , unique:true},
    companyname:{type:String},
    role:{type:String},
    experience:{type:String},
    interviewtype:{type:String},
    interviewques:{type:String},
    tips:{type:String},
    interviewProcess:{type:String},
    anonymously:{type:Boolean}
});
const userinfo = mongoose.model("usersinfo",ExpusereinfoSchema);
export default userinfo;