import { Router } from "express";
import authRoutes from "./auth.routes";
import otpRouter from "./otp.routes";

const rootRouter = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use("/otp", otpRouter)

export default rootRouter