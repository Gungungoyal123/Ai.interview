import Groq from "groq-sdk";
import { Session } from "../models/sessionmodel.js";

export const startinterview = async (req, res) => {
  try {
    const {
      userId,
      role,
      experience,
      techStack,
      difficulty,
      companyType,
      interviewType,
    } = req.body;

    if (!role || !experience || !techStack) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const systemPrompt = `You are a strict and professional technical interviewer conducting a real job interview.

Role: ${role}
Experience Required: ${experience} years
Tech Stack: ${techStack}
Difficulty: ${difficulty || "Medium"}
Company Type: ${companyType || "Product-based"}
Interview Type: ${interviewType || "Technical"}

Rules you MUST follow:
- Ask ONE question at a time
- React naturally to answers
- If answer is incomplete ask a followup question
- If answer is wrong acknowledge and move on
- If answer is good say something natural like "Great!" then ask next question
- Cover at least 10 different topics total
- When all topics are covered say exactly: "INTERVIEW_COMPLETE"
- Sound like a real human interviewer
- Keep responses short and conversational`;

    const conversationhistory = [{ role: "system", content: systemPrompt }];

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: conversationhistory.map((msg) => ({
        // ✅ fixed
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
    });

    const firstquestion = response.choices[0].message.content;

    conversationhistory.push({
      role: "assistant",
      content: firstquestion,
    });

    const session = await Session.create({
      userId,
      role,
      experience,
      techStack,
      difficulty,
      companyType,
      interviewType,
      conversationHistory: conversationhistory,
      status: "active",
    });

    return res.status(200).json({
      success: true,
      sessionid: session._id,
      firstquestion,
    });
  } catch (error) {
    console.error("Start interview error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
