import Groq from "groq-sdk";
import { Session } from "../models/sessionmodel.js";
export  const chat=async(req,res)=>{
    try {
        const {sessionid,useranswer}=req.body;
        if(!sessionid || !useranswer){
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const session=await Session.findById(sessionid);
        if (!session) {
  return res.status(404).json({ success: false, message: "Session not found" });
}
        session.conversationHistory.push({
             role:"user",
             content:useranswer
        });
        
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
       const response = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: session.conversationHistory.map(msg => ({
    role: msg.role,
    content: msg.content
  })), // ✅ strips _id
  temperature: 0.7,
});
        const interviewanswer=response.choices[0].message.content;
        session.conversationHistory.push({
            role:"assistant",
            content:interviewanswer
        });
        const isComplete = interviewanswer.includes("INTERVIEW_COMPLETE");
    if (isComplete) {
      session.status = "completed";
    }

    // save updated history to MongoDB
    await session.save();
    return res.status(200).json({
      success: true,
      interviewanswer,
      isComplete
    });

    } catch (error) {
        console.error("Chat error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
    }
};