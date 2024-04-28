import { Router } from "express";
import authRoutes from "./auth.routes";
import otpRoutes from "./otp.routes";
import parentRoutes from "./parent.routes"

const rootRouter = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use("/otp", otpRoutes)
rootRouter.use("/parent", parentRoutes)

export default rootRouter