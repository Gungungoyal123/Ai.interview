import dotenv from "dotenv";
dotenv.config();
console.log("🔥 SERVER.JS IS RUNNING");
import express from "express";

import { connectdb } from "./config/database.js";
import { userRouter } from "./routes/authrouter.js";
import interviewRouter from './routes/interviewRouter.js';
import voiceRouter from "./interview/voice.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: function(origin, callback) {
      const allowed = [
        "http://localhost:5173",
        "https://ai-interview-mauve.vercel.app"
      ];
      if (!origin || allowed.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());
connectdb();
app.use('/user', userRouter);
app.use("/api/voice", voiceRouter);
console.log("API KEY:", process.env.ELEVENLABS_API_KEY);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("server is listening");
});