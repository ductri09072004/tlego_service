import express from "express";
import { getRequests} from "../controllers/Orderpro.controller.js";

const router = express.Router();

router.get("/orderpro", getRequests);

// Xuất theo chuẩn ES Module
export default router;
