import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";
import {
	approveReview,
	deleteReview,
	deleteUser,
	loadData,
} from "../controllers/admin.controller";

const adminRoutes = Router();

adminRoutes.get("/load-data", authMiddleware, adminMiddleware, loadData);
adminRoutes.post("/delete-user", authMiddleware, adminMiddleware, deleteUser);
adminRoutes.post(
	"/approve-review",
	authMiddleware,
	adminMiddleware,
	approveReview
);
adminRoutes.post(
	"/delete-review",
	authMiddleware,
	adminMiddleware,
	deleteReview
);

export default adminRoutes;
