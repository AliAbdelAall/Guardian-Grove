import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import teacherMiddleware from "../middlewares/teacher.middleware";
import { addStudent, getStudents } from "../controllers/teach.controller";


const teacherRoutes = Router()

teacherRoutes.get("/get-students", authMiddleware, teacherMiddleware, getStudents)
teacherRoutes.put("/add-student", authMiddleware, teacherMiddleware, addStudent)

export default teacherRoutes