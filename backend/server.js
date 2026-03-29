import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./config/database.js";
import { userRouter } from "./routes/authrouter.js";
dotenv.config();
connectdb();
const app=express();
app.use(express.json());

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log("server is listenign ");
})
app.use('/api/users',userRouter);
