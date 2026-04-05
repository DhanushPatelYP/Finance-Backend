import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { getSummary, getCategoryWise, getTrends } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/summary",authenticate,getSummary);
router.get("/category",authenticate,getCategoryWise);
router.get("/trends",authenticate,getTrends);

export default router;