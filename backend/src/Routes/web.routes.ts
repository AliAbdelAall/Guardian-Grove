import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import webMiddleware from "../middlewares/web.middleware";
import {
	UpdateUserProfilePic,
	checkRole,
	editDob,
} from "../controllers/web.controller";
import multerMiddlware from "../middlewares/multer.middlware";

const webRoutes = Router();

webRoutes.get("/check-role", authMiddleware, webMiddleware, checkRole);
webRoutes.post(
	"/update-profile-picture",
	authMiddleware,
	multerMiddlware,
	UpdateUserProfilePic
);
webRoutes.post("/update-dob", authMiddleware, webMiddleware, editDob);

export default webRoutes;
