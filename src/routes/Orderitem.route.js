import express from "express";
import { getRequests,addRequest,deleteIDRequest,updateRequest} from "../controllers/OrderItem.comtroller.js";

const router = express.Router();

router.get("/orderitem", getRequests);
router.post("/orderitem", addRequest);
//router.delete("/orderitem/:id", deleteRequest);
router.put("/orderitem/:id", updateRequest);
router.delete("/orderitem/:order_id", deleteIDRequest);

// Xuất theo chuẩn ES Module
export default router;
