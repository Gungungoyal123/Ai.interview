import dotenv from "dotenv";
dotenv.config();
console.log("🔥 SERVER.JS IS RUNNING");
import express from "express";

// import cors from "cors";
import { connectdb } from "./config/database.js";
import { userRouter } from "./routes/authrouter.js";
import interviewRouter from './routes/interviewRouter.js';
import cors from "cors";



const app = express();
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
connectdb();
app.use('/user', userRouter);
app.use("/api/interview", interviewRouter);
// app.post('/test', (req, res) => {
//     res.send("TEST WORKING");
// });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("server is listening");
});
