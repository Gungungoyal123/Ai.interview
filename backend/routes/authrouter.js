import { login } from "../controllers/login.js";
import {Router} from 'express';
import { signup } from "../controllers/signup.js";
import { startinterview } from "../interview/startinterview.js";
import { generateFeedback } from "../interview/feedback.js";
import { chat } from "../interview/chat.js";
export const userRouter=Router();
console.log("Auth router working");
userRouter.route('/signup').post(signup)
userRouter.route('/login').post(login);
userRouter.route('/api/startinterview').post(startinterview);
userRouter.route('/api/feedback').post(generateFeedback);
userRouter.route('/api/chat').post(chat)
