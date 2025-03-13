import express from "express";
import { getRequests } from "../controllers/Catgories.controller.js";

const router = express.Router();

router.get("/categories", getRequests);

// Xuất theo chuẩn ES Module
export default router;
