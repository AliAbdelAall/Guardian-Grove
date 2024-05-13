import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { sendMessage } from "../controllers/message.controller";

const messageRoutes = Router();

messageRoutes.post("/create-message", authMiddleware, sendMessage);

export default messageRoutes;
