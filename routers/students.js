import express from "express";
import { studentController } from "../controllers/index.js";
const router = express.Router();

router.post("/", studentController.insertStudent);
router.get("/", studentController.getAllStudents);

router.get("/:id", studentController.getStudentById);
router.patch("/update", studentController.updateStudent);

router.post("/insert", studentController.insertStudent);
// router.post("/gennerateStudents", studentController.gennerateStudents);


export default router;
