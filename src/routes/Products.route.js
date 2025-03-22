import express from "express";
import {
  getRequests,
  addRequest,
  deleteRequest,
  updateRequest,
  getRequestById,
} from "../controllers/Products.controller.js";

const router = express.Router();

router.get("/products", getRequests);
router.post("/products", addRequest);
router.get("/products/:id", getRequestById);
router.delete("/products/:id", deleteRequest);
router.put("/products/:id", updateRequest);

// Xuất theo chuẩn ES Module
export default router;
