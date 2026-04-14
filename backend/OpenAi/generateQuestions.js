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
         content: `You are a senior technical interviewer at a ${companyType || "Product-based"} company.

Your task is to generate 10 realistic interview questions for the following candidate profile:

CANDIDATE PROFILE:
- Role: ${role || "Software Engineer"}
- Experience: ${experience || "1"} years
- Tech Stack: ${techStack || "JavaScript"}
- Difficulty Level: ${difficulty || "Medium"}
- Interview Type: ${interviewType || "Technical"}
- Company Type: ${companyType || "Product-based"}

INSTRUCTIONS:
- Generate questions exactly as a real interviewer would ask them in a live interview
- Questions must be specific to the candidate's tech stack — do NOT generate generic questions
- Match difficulty: ${difficulty === "Easy" ? "Focus on fundamentals and basic concepts" : difficulty === "Hard" ? "Focus on deep system design, optimization, and edge cases" : "Mix of conceptual and practical questions"}
- For ${interviewType === "Technical" ? "technical interviews: include coding logic, debugging, and architecture questions" : interviewType === "HR" ? "HR interviews: include behavioral, situational, and culture-fit questions" : "system design: include scalability, database design, and architecture questions"}
- For ${companyType === "Startup" ? "startups: focus on problem-solving speed, versatility, and ownership mindset" : companyType === "Product-based" ? "product companies: focus on DSA, system design, and deep technical concepts" : "service companies: focus on project experience, communication, and client scenarios"}
- Make questions progressively harder (first 3 basic, next 4 intermediate, last 3 advanced)
- Each question should feel like it came from a real ${experience > 3 ? "senior-level" : "fresher/junior-level"} interview

QUESTION DISTRIBUTION:
- 3 questions: type "Basic" — foundational concepts
- 4 questions: type "Intermediate" — applied knowledge  
- 3 questions: type "Advanced" — deep expertise / real-world scenarios

STRICT OUTPUT RULES:
- Return ONLY a valid JSON array
- No markdown, no backticks, no explanation
- No numbering before questions
- Start directly with [ and end with ]

FORMAT:
[
  { "type": "Basic", "question": "your question here" },
  { "type": "Intermediate", "question": "your question here" },
  { "type": "Advanced", "question": "your question here" }
]`,
        },
      ],
       max_tokens: 2048, 
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
