import express from "express";
import {
  getRequests,
  addRequest,
  deleteIDRequest,
  updateRequest,
  updateRating,
} from "../controllers/OrderItem.comtroller.js";
import { addRequestForGuest } from "../controllers/Orderdetail.controller.js";

const router = express.Router();

router.get("/orderitem", getRequests);
router.post("/orderitem", addRequest);
//router.delete("/orderitem/:id", deleteRequest);
router.put("/orderitem/rating/update", updateRating);
router.put("/orderitem/:id", updateRequest);
router.delete("/orderitem/:order_id", deleteIDRequest);

// Đặt hàng cho khách vãng lai
router.post("/orderitem/forguest", addRequestForGuest);

// Xuất theo chuẩn ES Module
export default router;
