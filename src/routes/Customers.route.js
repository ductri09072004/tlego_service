import express from "express";
import {
  getRequests,
  addRequest,
  deleteRequest,
  updateRequest,
  getUserInfo,
} from "../controllers/Customers.controller.js";

const router = express.Router();

router.get("/customers", getRequests);
router.post("/customers", addRequest);
router.delete("/customers/:id", deleteRequest);
router.put("/customers/:id", updateRequest);
router.get("/customers/userInfo/:id", getUserInfo);

// Xuất theo chuẩn ES Module
export default router;
