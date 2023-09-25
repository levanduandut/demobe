import express from "express";
const router = express.Router();
import { body, query, validationResult } from "express-validator";
import { userController } from "../controllers/index.js";

router.get("/", (req, res) => {
  res.send("GET USER");
});

router.get("/:id", userController.getDetailUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user by providing an email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 5
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, validation failed
 *       500:
 *         description: Internal server error
 */
router.post(
  "/login",
  body("password").isLength({ min: 5 }),
  body("email").isEmail(),
  userController.login
);
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user by providing an email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               adđress:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 5
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, validation failed
 *       500:
 *         description: Internal server error
 */
router.post("/register", userController.register);

export default router;
