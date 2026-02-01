import express from "express";
import {signup} from "../controllers/authcontroller.js";
import { login } from "../controllers/authcontroller.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
const router=express.Router();


router.post("/signup",signup);
router.post("/login",login);
router.get("/me", authMiddleware, (req, res) => {
  res.json({ authenticated: true, userId: req.user.id });
});

export default router;