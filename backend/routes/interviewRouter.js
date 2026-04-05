import express from "express";
import { generateQuestions } from "../OpenAi/generateQuestions.js";

const router = express.Router();

router.post("/generate", generateQuestions);

export default router;