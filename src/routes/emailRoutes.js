import express from "express";
import {
  welcomeEmail,
  recoverEmail,
  boughtEmail,
} from "../controllers/emailController.js";

const router = express.Router();

router.post("/welcome", welcomeEmail);
router.post("/forgot", recoverEmail);
router.post("/bought-email", boughtEmail);

export default router;
