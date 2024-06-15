import express from "express";
const router = express.Router();
import { login, register } from "../controllers/AuthController.js";

router.post("/v1/auth/login", login);
router.post("/v1/auth/register", register);

export default router;
