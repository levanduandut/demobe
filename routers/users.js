import express from "express";
const router = express.Router();
import { body, query, validationResult } from "express-validator";
import { userController } from "../controllers/index.js";

router.get("/", (req, res) => {
  res.send("GET USER");
});
router.get("/:id", userController.getDetailUser);

router.post(
  "/login",
  body("password").isLength({ min: 5 }),
  body("email").isEmail(),
  userController.login
);
router.post("/register", userController.register);

export default router;
