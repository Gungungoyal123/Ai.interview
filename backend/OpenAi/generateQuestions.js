import Groq from "groq-sdk";
import { interviewinfo } from "../models/interviewinfo.js";

export const generateQuestions = async (req, res) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  console.log("Groq key check:", process.env.GROQ_API_KEY?.slice(0, 8));

  // const { role, experience, techStack } = req.body;
  const {
  role,
  experience,
  techStack,
  difficulty,
  companyType,
  interviewType,
  userId
} = req.body;

  if (!role || !experience || !techStack) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
     const existing = await interviewinfo.findOne({ userId });

    if (existing) {
      Object.assign(existing, {
        role,
        experience,
        techStack,
        difficulty,
        companyType,
        interviewType,
      });
      await existing.save();
    } else {
      await interviewinfo.create({
        userId,
        role,
        experience,
        techStack,
        difficulty,
        companyType,
        interviewType,
      });
    }
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Generate 10 interview questions for:
Role: ${role || "software Engineer"}
Experience: ${experience || "1"} years 
Technologies: ${techStack || "JS"}
Difficulty: ${difficulty || "Medium"}
Company Type: ${companyType || "Product-based"}
Interview Type: ${interviewType || "Technical"}


Rules:
- Return ONLY a valid JSON array
- No markdown, no backticks, no explanation  
- Start directly with [ and end with ]

Format exactly like this:
[
  { "type": "Basic", "question": "your question here" },
  { "type": "Intermediate", "question": "your question here" },
  { "type": "Advanced", "question": "your question here" }
]`,
        },
      ],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content;
    console.log("Raw Groq response:", text);

    // safely extract JSON array
    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]");

    if (jsonStart === -1 || jsonEnd === -1) {
      console.error("No JSON found in response");
      return res.status(500).json({ message: "Invalid response format" });
    }

    const jsonString = text.slice(jsonStart, jsonEnd + 1);
    const questions = JSON.parse(jsonString);

    console.log("✅ Questions generated:", questions.length);
    res.status(200).json({ success: true, questions });
  } catch (err) {
    console.error("Groq error:", err.message);
    res
      .status(500)
      .json({ message: "Failed to generate questions", error: err.message });
  }
};
