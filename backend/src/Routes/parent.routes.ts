import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
	UpdateProfilePic,
	bookMeeting,
	connectParentPsychologist,
	createConversationWithPsychologist,
	createConversationWithTeacher,
	getPsychologistsAndTeachers,
	ratePsychologist,
	saveToken,
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

parentRoutes.post(
	"/book-meeting",
	authMiddleware,
	parentMiddleware,
	bookMeeting
);

parentRoutes.post(
	"/create-conversation-teacher",
	authMiddleware,
	parentMiddleware,
	createConversationWithTeacher
);

parentRoutes.post(
	"/create-conversation-psychologist",
	authMiddleware,
	parentMiddleware,
	createConversationWithPsychologist
);

parentRoutes.post("/save-token", authMiddleware, parentMiddleware, saveToken);

export default parentRoutes;
