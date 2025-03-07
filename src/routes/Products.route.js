import express from "express";
import { getRequests} from "../controllers/Products.controller.js";

const router = express.Router();

router.get("/products", getRequests);

// Xuất theo chuẩn ES Module
export default router;
