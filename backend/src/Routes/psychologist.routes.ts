import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import psychologistMiddleware from "../middlewares/psychologist.middleware";
import {
	getClients,
	updateSpeciality,
	updateYearsOfExperience,
} from "../controllers/psychologist.controller";

const psychologistRoutes = Router();

psychologistRoutes.get(
	"/get-clients",
	authMiddleware,
	psychologistMiddleware,
	getClients
);
psychologistRoutes.post(
	"/update-speciality",
	authMiddleware,
	psychologistMiddleware,
	updateSpeciality
);

psychologistRoutes.post(
	"/update-years-of-experience",
	authMiddleware,
	psychologistMiddleware,
	updateYearsOfExperience
);

export default psychologistRoutes;
