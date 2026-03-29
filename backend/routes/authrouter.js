import { login } from "../controllers/login.js";
import {Router} from 'express';
import { signup } from "../controllers/signup.js";
export const userRouter=Router();
userRouter.route('/signup').post(signup)
