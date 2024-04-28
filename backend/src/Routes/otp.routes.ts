import { Router } from "express";
import { SaveAndSendOTP, resetPassword, verifyOTP } from "../controllers/otp.controller";


const otpRoutes = Router()

otpRoutes.post("/send-otp", SaveAndSendOTP)
otpRoutes.post("/verify-otp", verifyOTP)
otpRoutes.post("/reset-password", resetPassword)

export default otpRoutes