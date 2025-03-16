import express from "express";
import { getRequests,addRequest,deleteRequest,updateRequest } from "../controllers/Catgories.controller.js";

const router = express.Router();

router.get("/categories", getRequests);
router.post("/categories", addRequest);
router.delete("/categories/:id", deleteRequest);
router.put("/categories/:id", updateRequest);

// Xuất theo chuẩn ES Module
export default router;
