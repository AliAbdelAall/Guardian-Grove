import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import webMiddleware from "../middlewares/web.middleware";
import { UpdateUserProfilePic, checkRole } from "../controllers/web.controller";
import multerMiddlware from "../middlewares/multer.middlware";

const webRoutes = Router();

webRoutes.get("/check-role", authMiddleware, webMiddleware, checkRole);
webRoutes.post(
	"/update-profile-picture",
	authMiddleware,
	multerMiddlware,
	UpdateUserProfilePic
);

export default webRoutes;
