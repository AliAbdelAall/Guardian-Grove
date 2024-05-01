import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { connectParentPsychologist, getPsychologistsAndTeachers } from "../controllers/parent.controller";
import parentMiddleware from "../middlewares/parent.middleware";

const parentRoutes = Router()

parentRoutes.get("/get-psychologists-teachers",authMiddleware, parentMiddleware, getPsychologistsAndTeachers)
parentRoutes.put("/connect-parent-psychologist", authMiddleware, parentMiddleware, connectParentPsychologist)

export default parentRoutes