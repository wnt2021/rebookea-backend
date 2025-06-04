import express from "express";
import {
  login,
  register,
  recoverPassword,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/recover", recoverPassword);
router.put("/reset/:id", resetPassword);

export default router;
