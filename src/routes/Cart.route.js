import express from "express";
import {
  addCart,
  clearCart,
  getCart,
  getCartById,
} from "../controllers/Cart.controller.js";

const router = express.Router();

router.get("/carts/:id", getCartById);
router.post("/carts/addCart/", addCart);
router.get("/carts", getCart);
router.delete("/carts/:id", clearCart);

// Xuất theo chuẩn ES Module
export default router;
