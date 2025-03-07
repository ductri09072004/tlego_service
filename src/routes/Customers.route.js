import express from "express";
import { getRequests} from "../controllers/Customers.controller.js";

const router = express.Router();

router.get("/customers", getRequests);

// Xuất theo chuẩn ES Module
export default router;
