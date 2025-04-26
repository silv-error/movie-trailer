import express from "express";
import protectRoute from "../middleware/accessRoute.js";
import { getAuthUser, login, logout, signup } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, getAuthUser);

export default router;