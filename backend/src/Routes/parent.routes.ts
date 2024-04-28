import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { connectParentPsychologist } from "../controllers/parent.controller";

const parentRoutes = Router()

parentRoutes.put("/connect-parent-psychologist", authMiddleware, connectParentPsychologist)

export default parentRoutes