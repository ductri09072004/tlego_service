import express from "express";
import {
  getRequests,
  addRequest,
  deleteRequest,
  updateRequest,
  getCateCounter,
} from "../controllers/Catgories.controller.js";

const router = express.Router();

router.get("/categories", getRequests);
router.get("/categories/counter/:id", getCateCounter);
router.post("/categories", addRequest);
router.delete("/categories/:id", deleteRequest);
router.put("/categories/:id", updateRequest);

// Xuất theo chuẩn ES Module
export default router;
