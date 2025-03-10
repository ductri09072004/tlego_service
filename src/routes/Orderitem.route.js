import express from "express";
import { getRequests} from "../controllers/OrderItem.comtroller.js";

const router = express.Router();

router.get("/orderitem", getRequests);

// Xuất theo chuẩn ES Module
export default router;
