import { Router } from "express";
import { addChild } from "../controllers/child .controller";
import parentMiddleware from "../middlewares/parent.middleware";
import authMiddleware from "../middlewares/auth.middleware";

const childRoutes = Router()

childRoutes.post("/add-child",authMiddleware, parentMiddleware, addChild)

export default childRoutes