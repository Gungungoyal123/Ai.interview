import dotenv from "dotenv";
dotenv.config();
console.log("🔥 SERVER.JS IS RUNNING");
import express from "express";

// import cors from "cors";
import { connectdb } from "./config/database.js";
import { userRouter } from "./routes/authrouter.js";
import interviewRouter from './routes/interviewRouter.js';
import voiceRouter from "./interview/voice.js";
import cors from "cors";



const app = express();
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-interview-mauve.vercel.app"
    ],
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
