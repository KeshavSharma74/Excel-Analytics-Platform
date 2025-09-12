import { Router } from "express";
import { login, register,sendResetOTP,resetPassword, checkAuth} from "../controllers/user.controller.js";
import userAuth from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/reset-otp',sendResetOTP);
userRouter.post('/reset-password',resetPassword);
userRouter.get('/check-auth',userAuth,checkAuth);


export default userRouter;