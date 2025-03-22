import express from "express";
import {
  getRequests,
  addRequest,
  deleteRequest,
  updateRequest,
  getRatingById,
} from "../controllers/rating.controller.js";

const router = express.Router();

router.get("/rating", getRequests);
router.get("/rating/getByID/:id", getRatingById);
router.post("/rating", addRequest);
router.delete("/rating/:id", deleteRequest);
router.put("/rating/:id", updateRequest);

// Xuất theo chuẩn ES Module
export default router;
