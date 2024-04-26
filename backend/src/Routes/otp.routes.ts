import { Router } from "express";
import { SaveAndSendOTP, resetPassword, verifyOTP } from "../controllers/otp.controller";
import authMiddleware from "../middlewares/auth.middleware";


const otpRouter = Router()

otpRouter.post("/send-otp", SaveAndSendOTP)
otpRouter.post("/verify-otp", verifyOTP)
otpRouter.post("/reset-password", resetPassword)

export default otpRouter