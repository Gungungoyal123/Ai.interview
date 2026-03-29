import { login } from "../controllers/login.js";
import {Router} from 'express';
import { signup } from "../controllers/signup.js";
export const userRouter=Router();
console.log("Auth router working");
userRouter.route('/signup').post(signup)
userRouter.route('/login').post(login);