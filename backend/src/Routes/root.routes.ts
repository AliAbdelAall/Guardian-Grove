import { Router } from "express";
import authRoutes from "./auth.routes";
import otpRoutes from "./otp.routes";
import parentRoutes from "./parent.routes";
import psychologistRoutes from "./psychologist.routes";
import childRoutes from "./child.routes";
import webRoutes from "./web.routes";
import teacherRoutes from "./teacher.routes";
import messageRoutes from "./message.routes";
import chatBotRoutes from "./chatbot.routes";
import adminRoutes from "./admin.routes";

const rootRouter = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/otp", otpRoutes);
rootRouter.use("/parent", parentRoutes);
rootRouter.use("/psychologist", psychologistRoutes);
rootRouter.use("/child", childRoutes);
rootRouter.use("/web", webRoutes);
rootRouter.use("/teacher", teacherRoutes);
rootRouter.use("/message", messageRoutes);
rootRouter.use("/chatbot", chatBotRoutes);
rootRouter.use("/admin", adminRoutes);

export default rootRouter;
