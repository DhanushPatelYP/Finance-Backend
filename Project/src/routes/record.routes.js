import express from "express";
import { authenticate,authorizeRoles } from "../middleware/auth.middleware.js";
import {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord
} from "../controllers/record.controller.js";

const router = express.Router();

router.post("/",authenticate,authorizeRoles("admin","analyst"),createRecord);
router.get("/",authenticate,getRecords)

router.patch("/:id",authenticate,authorizeRoles("admin"),updateRecord);
router.delete("/:id",authenticate,authorizeRoles("admin"),deleteRecord);

export default router;