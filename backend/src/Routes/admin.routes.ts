import { Router } from "express";
import { auth } from "firebase-admin";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";
import { loadData } from "../controllers/admin.controller";

const adminRoutes = Router();

adminRoutes.get("/load-data", authMiddleware, adminMiddleware, loadData);

export default adminRoutes;
