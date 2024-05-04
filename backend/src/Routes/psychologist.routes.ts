import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import psychologistMiddleware from "../middlewares/psychologist.middleware";
import {
	getClients,
	updateSpeciality,
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

export default psychologistRoutes;
