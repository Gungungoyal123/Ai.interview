
console.log("🔥 SERVER.JS IS RUNNING");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectdb } from "./config/database.js";
import { userRouter } from "./routes/authrouter.js";
import cors from "cors";
dotenv.config();
connectdb();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRouter);

// app.post('/test', (req, res) => {
//     res.send("TEST WORKING");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is listening");
});
