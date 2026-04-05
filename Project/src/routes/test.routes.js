import express from "express";
import { authenticate, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

// Only logged-in users
router.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

// Only admin
router.get(
  "/admin",
  authenticate,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Admin access granted",
    });
  }
);

export default router;