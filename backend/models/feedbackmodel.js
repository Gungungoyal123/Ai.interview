import mongoose from "mongoose";
const feedback=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    sessionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Session",
    },
     role: String,
  experience: String,
  techStack: String,
  overallScore: Number,
  technicalScore: Number,
  communicationScore: Number,
  strengths: [String],
  weaknesses: [String],
  suggestions: [String],
  confidenceAnalysis: String,
  verdict: String,
}, { timestamps: true });

export const Feedback = mongoose.model("Feedback", feedback);




