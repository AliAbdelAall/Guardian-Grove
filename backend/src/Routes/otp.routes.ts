import { Router } from "express";
import { SaveAndSendOTP, resetPassword, verifyOTP } from "../controllers/otp.controller";
import authMiddleware from "../middlewares/auth.middleware";


const otpRouter = Router()

otpRouter.post("/send-otp",authMiddleware, SaveAndSendOTP)
otpRouter.post("/verify-otp",authMiddleware, verifyOTP)
otpRouter.post("/rest-password",authMiddleware, resetPassword)

export default otpRouter