import express from "express";
import {
  getRequests,
  addRequest,
  deleteRequest,
  updateRequest,
  getRequestById,
  searchProductByName,
  getAllProductNames
} from "../controllers/Products.controller.js";

const router = express.Router();

// Lấy danh sách tất cả sản phẩm
router.get("/products", getRequests);
// Lấy danh sách tất cả pro_name
router.get("/products/names", getAllProductNames);
// Tìm kiếm sản phẩm theo tên
router.get("/products/search", searchProductByName);
// Lấy thông tin sản phẩm theo ID (phải để sau các route cụ thể)
router.get("/products/:id", getRequestById);

// Các route còn lại
router.post("/products", addRequest);
router.delete("/products/:id", deleteRequest);
router.put("/products/:id", updateRequest);

// Xuất theo chuẩn ES Module
export default router;
