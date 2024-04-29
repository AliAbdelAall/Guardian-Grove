import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import webMiddleware from "../middlewares/web.middleware";
import { checkRole } from "../controllers/web.controller";

const webRoutes = Router()

webRoutes.get("/check-role", authMiddleware, webMiddleware, checkRole)

export default webRoutes
