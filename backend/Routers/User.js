import express from 'express';
const userRouter=express.Router();
import {signUp,login,userInfo, tokenValid} from '../Controllers/userController.js'
import authmiddleware from '../Middleware/auth.js';
userRouter.post('/register',signUp);
userRouter.post('/login',login);
userRouter.post('/tokenIsValid',tokenValid);
userRouter.get('/info',authmiddleware,userInfo)
export default userRouter;