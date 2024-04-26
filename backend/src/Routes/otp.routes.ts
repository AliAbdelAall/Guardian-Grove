import { Router } from "express";
import { SaveAndSendOTP } from "../controllers/OTP.controller";
import authMiddleware from "../middlewares/auth.middleware";


const otpRouter = Router()

otpRouter.post("/send-otp",authMiddleware, SaveAndSendOTP)

export default otpRouter