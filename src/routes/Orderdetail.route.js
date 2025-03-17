import express from "express";
import { getRequests,addRequest,deleteRequest,updateRequest ,deleteIDRequest} from "../controllers/Orderdetail.controller.js";

const router = express.Router();

router.get("/orderdetail", getRequests);
router.post("/orderdetail", addRequest);
//router.delete("/orderdetail/:id", deleteRequest);
router.put("/orderdetail/:id", updateRequest);
router.delete("/orderdetail/:order_id", deleteIDRequest);

// Xuất theo chuẩn ES Module
export default router;
