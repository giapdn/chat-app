import express from "express";
const router = express.Router();
import { login, register } from "../controllers/Auth.controller.js";
import { registerHandle } from "../middlewares/Auth.middleware.js";

router.post("/login", login);
router.post("/register", register);

export default router;
