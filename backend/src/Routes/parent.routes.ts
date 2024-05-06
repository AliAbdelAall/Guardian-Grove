import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
	UpdateProfilePic,
	connectParentPsychologist,
	getPsychologistsAndTeachers,
	ratePsychologist,
	updateUserDob,
} from "../controllers/parent.controller";
import parentMiddleware from "../middlewares/parent.middleware";
import multer from "multer";
import multerMiddlware from "../middlewares/multer.middlware";

const parentRoutes = Router();

parentRoutes.get(
	"/get-psychologists-teachers",
	authMiddleware,
	parentMiddleware,
	getPsychologistsAndTeachers
);
parentRoutes.put(
	"/connect-parent-psychologist",
	authMiddleware,
	parentMiddleware,
	connectParentPsychologist
);
parentRoutes.post(
	"/rate-psychologist",
	authMiddleware,
	parentMiddleware,
	ratePsychologist
);
parentRoutes.put("/edit-dob", authMiddleware, parentMiddleware, updateUserDob);

parentRoutes.post(
	"/update-profile-picture",
	authMiddleware,
	parentMiddleware,
	UpdateProfilePic,
	multerMiddlware
);

export default parentRoutes;
