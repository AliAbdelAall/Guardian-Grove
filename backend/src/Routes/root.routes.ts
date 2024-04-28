import { Router } from "express";
import authRoutes from "./auth.routes";
import otpRoutes from "./otp.routes";
import parentRoutes from "./parent.routes"
import psychologistRoutes from "./psychologist.routes";
import childRoutes from "./child.routes";

const rootRouter = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use("/otp", otpRoutes)
rootRouter.use("/parent", parentRoutes)
rootRouter.use("/psychologist", psychologistRoutes)
rootRouter.use("/child", childRoutes)

export default rootRouter