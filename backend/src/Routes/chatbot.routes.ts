import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import parentMiddleware from "../middlewares/parent.middleware";
import { generateResponse } from "../controllers/chatbot.controller";

const chatBotRoutes = Router();

chatBotRoutes.post(
	"/generate-response",
	authMiddleware,
	parentMiddleware,
	generateResponse
);

export default chatBotRoutes;
