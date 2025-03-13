import express from "express";
import { getRequests } from "../controllers/Catgories.controller.js";
import {
  addCart,
  getCart,
  getCartById,
} from "../controllers/Cart.controller.js";

const router = express.Router();

router.get("/carts/:id", getCartById);
router.post("/carts/addCart/", addCart);
router.get("/carts", getCart);

// Xuất theo chuẩn ES Module
export default router;
