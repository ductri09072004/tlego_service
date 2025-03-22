import express from "express";
import {
  addCart,
  clearCart,
  deleteCartId,
  getCart,
  getCartById,
  updateCartQuantity,
} from "../controllers/Cart.controller.js";

const router = express.Router();

router.get("/carts/:id", getCartById);
router.post("/carts/addCart/", addCart);
router.get("/carts", getCart);
router.delete("/carts/:id", clearCart);
router.delete("/carts/:userId/:cartProId", deleteCartId);
router.put("/carts/update/:userId/:cartProId", updateCartQuantity);

// Xuất theo chuẩn ES Module
export default router;
