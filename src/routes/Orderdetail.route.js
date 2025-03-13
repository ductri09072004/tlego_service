import express from "express";
import { getRequests,addRequest,deleteRequest,updateRequest } from "../controllers/Orderdetail.controller.js";

const router = express.Router();

router.get("/orderdetail", getRequests);
router.post("/orderdetail", addRequest);
router.delete("/orderdetail/:id", deleteRequest);
router.put("/orderdetail/:id", updateRequest);

// Xuất theo chuẩn ES Module
export default router;
