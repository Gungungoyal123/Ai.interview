import Groq from "groq-sdk";
import { Session } from "../models/sessionmodel.js";
import { Feedback } from "../models/feedbackmodel.js";

export const generateFeedback = async (req, res) => {
  try {
    const { sessionId, voiceAnalysis } = req.body; // ✅ removed userId

    if (!sessionId) {
      return res.status(400).json({ success: false, message: "Missing sessionId" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const feedbackPrompt = `Based on this interview conversation give detailed feedback.

Voice Analysis:
- Average Confidence: ${voiceAnalysis?.avgConfidence || "N/A"}
- Average Sentiment: ${voiceAnalysis?.avgSentiment || "N/A"}
- Filler Words Count: ${voiceAnalysis?.fillerWords || 0}

Return ONLY valid JSON like this with no extra text:
{
  "overallScore": 75,
  "technicalScore": 80,
  "communicationScore": 70,
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "suggestions": ["suggestion 1", "suggestion 2"],
  "confidenceAnalysis": "User was confident in most answers",
  "verdict": "Ready for mid-level roles"
}`;

    const messages = [
      ...session.conversationHistory,
      { role: "user", content: feedbackPrompt }
    ];

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
     messages: session.conversationHistory.map(msg => ({
    role: msg.role,
    content: msg.content
  })), 
      temperature: 0.5,
    });

    const text = response.choices[0].message.content;

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const feedbackData = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

    // ✅ get userId from session itself — no need to send from frontend
    const feedback = await Feedback.create({
      userId: session.userId,
      sessionId,
      role: session.role,
      experience: session.experience,
      techStack: session.techStack,
      ...feedbackData
    });

    session.status = "completed";
    await session.save();

    return res.status(200).json({
      success: true,
      feedback
    });

  } catch (error) {
    console.error("Feedback error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};