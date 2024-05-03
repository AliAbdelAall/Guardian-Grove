import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
	connectParentPsychologist,
	getPsychologistsAndTeachers,
	ratePsychologist,
	updateUserDob,
} from "../controllers/parent.controller";
import parentMiddleware from "../middlewares/parent.middleware";

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

export default parentRoutes;
