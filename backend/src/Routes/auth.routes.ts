import { Router } from "express";
import { signup, login, registerAdmin } from "../controllers/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/register-admin", registerAdmin);

export default authRoutes;
