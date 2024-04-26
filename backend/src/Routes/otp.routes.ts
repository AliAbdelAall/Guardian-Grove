import { Router } from "express";
import { SaveAndSendOTP, verifyOTP } from "../controllers/otp.controller";
import authMiddleware from "../middlewares/auth.middleware";


const otpRouter = Router()

otpRouter.post("/send-otp",authMiddleware, SaveAndSendOTP)
otpRouter.post("/verify-otp",authMiddleware, verifyOTP)

export default otpRouter