import express from "express";
import {
  getRequests,
  getUserInfo,
} from "../controllers/Customers.controller.js";

const router = express.Router();

router.get("/customers", getRequests);
router.get("/customers/userInfo/:id", getUserInfo);

// Xuất theo chuẩn ES Module
export default router;
