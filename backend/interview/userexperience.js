import Groq from "groq-sdk";
import userinfo from "../models/InterviewExp.js";

const userexperience = async (req, res) => {

  try {

    const {
      name,
      email,
      companyname,
      role,
      experience,
      interviewtype,
      interviewques,
      tips,
      anonymously,
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !companyname ||
      !role ||
      !interviewques
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Groq Initialization
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Efficient AI Prompt
    const systemPrompt = `
You are an AI moderator for an interview experience platform.

Your task:
1. Detect spam
2. Detect abusive language
3. Detect fake or meaningless content
4. Ensure the interview experience is realistic and professional

Return response ONLY in JSON format:

{
  "valid": true,
  "reason": "Content looks good"
}

OR

{
  "valid": false,
  "reason": "Spam or abusive content detected"
}
`;

    // User Content
    const userContent = `
Name: ${name}
Email: ${email}
Company: ${companyname}
Role: ${role}
Experience: ${experience}
Interview Type: ${interviewtype}
Questions: ${interviewques}
Tips: ${tips}
`;

    // AI Validation
    const response =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: systemPrompt,
          },

          {
            role: "user",
            content: userContent,
          },
        ],

        temperature: 0.3,
      });

    // AI Response
    const aiResponse =
      response.choices[0].message.content;

    // Convert String JSON to Object
    const parsedResponse =
      JSON.parse(aiResponse);

    // Reject Invalid Content
    if (!parsedResponse.valid) {

      return res.status(400).json({
        success: false,
        message: parsedResponse.reason,
      });
    }

    // Save to MongoDB
    const newExperience =
      await UserInfo.create({
        name,
        email,
        companyname,
        role,
        experience,
        interviewtype,
        interviewques,
        tips,
        anonymously,
      });

    // Success Response
    return res.status(201).json({
      success: true,
      message:
        "Interview Experience Shared Successfully",
      data: newExperience,
    });

  } catch (error) {

    console.error(
      "Submit Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default userexperience;