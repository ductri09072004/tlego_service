import express from "express";
import { getRequests } from "../controllers/ExtractBill.controller.js";

const router = express.Router();

router.get("/extractbillss", getRequests);

// Xuất theo chuẩn ES Module
export default router;
