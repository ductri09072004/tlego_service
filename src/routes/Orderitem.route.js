import express from "express";
import { getRequests,addRequest,deleteRequest,updateRequest} from "../controllers/OrderItem.comtroller.js";

const router = express.Router();

router.get("/orderitem", getRequests);
router.post("/orderitem", addRequest);
router.delete("/orderitem/:id", deleteRequest);
router.put("/orderitem/:id", updateRequest);

// Xuất theo chuẩn ES Module
export default router;
