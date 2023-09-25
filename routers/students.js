import express from "express";
import { studentController } from "../controllers/index.js";
const router = express.Router();

router.post("/", studentController.insertStudent);

/**
 * @swagger
 * /students/getAll:
 *   post:
 *     summary: Get a student by ID
 *     description: Retrieve a student's information by providing their unique ID.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               size:
 *                 type: number
 *               page:
 *                 type: number
 *               searchString:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved student information.
 *       400:
 *         description: Bad request, validation failed.
 *       404:
 *         description: Student not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/getAll", studentController.getAllStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     description: Retrieve a student's information by providing their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the student to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved student information.
 *       400:
 *         description: Bad request, validation failed.
 *       404:
 *         description: Student not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", studentController.getStudentById);

/** 
 * @swagger 
 * /students/update:
 *   patch: 
 *     summary: Update a student by ID
 *     description: Update a student's information by providing their unique ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the student to update.
 *               name:
 *                 type: string
 *                 description: The updated name of the student (optional).
 *               email:
 *                 type: string
 *                 description: The updated email of the student (optional).
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The updated list of languages the student speaks (optional).
 *               gender:
 *                 type: string
 *                 description: The updated gender of the student (optional).
 *               phone:
 *                 type: string
 *                 description: The updated phone number of the student (optional).
 *               address:
 *                 type: string
 *                 description: The updated address of the student (optional).
 *     responses:
 *       200:
 *         description: Successfully updated student information.
 *       400:
 *         description: Bad request, validation failed.
 *       404:
 *         description: Student not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/update", studentController.updateStudent);

router.post("/insert", studentController.insertStudent);
// router.post("/gennerateStudents", studentController.gennerateStudents);

export default router;
