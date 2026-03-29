// import express from "express";
// import dotenv from "dotenv";
// import { connectdb } from "./config/database.js";
// import { userRouter } from "./routes/authrouter.js";
// import { signup } from "./controllers/signup.js";
// import { login } from "./controllers/login.js";
// dotenv.config();
// connectdb();
// const app=express();
// app.use(express.json());
// app.use('/user',userRouter);
// app.post('/test', (req, res) => {
//     res.send("TEST WORKING");
// });
// const PORT=process.env.PORT||5000;
// app.listen(PORT,()=>{
//     console.log("server is listenign ");
// })
// console.log("Router loaded");
console.log("🔥 SERVER.JS IS RUNNING");
import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./config/database.js";
import { userRouter } from "./routes/authrouter.js";

dotenv.config();
connectdb();

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.get('/test', (req, res) => {
    res.send("TEST WORKING");
});
// app.post('/test', (req, res) => {
//     res.send("TEST WORKING");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is listening");
});
