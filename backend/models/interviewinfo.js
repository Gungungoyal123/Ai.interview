import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // link with user
  },
  role: String,
  experience: Number,
  techStack: String,
  difficulty: String,
  companyType: String,
  interviewType: String,
}, { timestamps: true });

export const interviewinfo = mongoose.model("interviewinfo", interviewSchema);