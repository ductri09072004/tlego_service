import express from "express";
import {
  getRequests,
  getUserInfo,
} from "../controllers/Customers.controller.js";
import {
  getRequests,
  addRequest,
  deleteRequest,
  updateRequest,
} from "../controllers/Customers.controller.js";

const router = express.Router();

router.get("/customers", getRequests);
router.get("/customers/userInfo/:id", getUserInfo);
router.post("/customers", addRequest);
router.delete("/customers/:id", deleteRequest);
router.put("/customers/:id", updateRequest);

// Xuất theo chuẩn ES Module
export default router;
