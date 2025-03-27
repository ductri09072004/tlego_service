import { database } from "../data/firebaseConfig.js";

// Lấy danh sách tất cả requests từ Firebase
export const getRequests = async (req, res) => {
  try {
    const requestRef = database.ref("products");
    const snapshot = await requestRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Không có dữ liệu" });
    }

    res.json(snapshot.val());
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
  }
};

// thêm danh sách
export const addRequest = async (req, res) => {
  try {
    const {
      block_count,
      cate_id,
      old,
      pro_ID,
      pro_description,
      pro_img,
      pro_name,
      pro_price,
      pro_stock,
      sales_count,
    } = req.body;

    if (
      !block_count ||
      !cate_id ||
      !old ||
      !pro_ID ||
      !pro_description ||
      !pro_img ||
      !pro_price ||
      !pro_stock ||
      !pro_name ||
      !sales_count
    ) {
      return res.status(400).json({ error: "Thiếu thông tin giao dịch" });
    }

    const requestRef = database.ref("products").push();
    await requestRef.set({
      block_count,
      cate_id,
      old,
      pro_ID,
      pro_description,
      pro_img,
      pro_name,
      pro_price,
      pro_stock,
      sales_count,
    });

    res
      .status(201)
      .json({ message: "Giao dịch đã được thêm", id: requestRef.key });
  } catch (error) {
    console.error("Lỗi khi thêm giao dịch:", error);
    res.status(500).json({ error: "Lỗi khi thêm giao dịch" });
  }
};

// xóa danh sách
export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Thiếu ID danh mục" });
    }

    const requestRef = database.ref(`products/${id}`);
    const snapshot = await requestRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Danh mục không tồn tại" });
    }

    await requestRef.remove();
    res.status(200).json({ message: "Danh mục đã được xóa" });
  } catch (error) {
    console.error("Lỗi khi xóa danh mục:", error);
    res.status(500).json({ error: "Lỗi khi xóa danh mục" });
  }
};

// Cập nhật giao dịch
export const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
      return res.status(400).json({ error: "Thiếu ID giao dịch" });
    }

    const requestRef = database.ref(`products/${id}`);
    const snapshot = await requestRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Giao dịch không tồn tại" });
    }

    await requestRef.update(updatedData);
    res.status(200).json({ message: "Giao dịch đã được cập nhật" });
  } catch (error) {
    console.error("Lỗi khi cập nhật giao dịch:", error);
    res.status(500).json({ error: "Lỗi khi cập nhật giao dịch" });
  }
};

export const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Thiếu ID giao dịch" });
    }

    const snapshot = await database.ref("products").once("value");
    if (snapshot.exists()) {
      const products = snapshot.val();

      const productEntry = Object.entries(products).find(
        ([key, value]) => value.pro_ID === id
      );

      if (productEntry) {
        return res.json({ id: productEntry[0], ...productEntry[1] });
      }
    }
    res.status(404).json({ message: "Sản phẩm không tồn tại" });
  } catch (error) {
    console.error("Lỗi khi cập nhật giao dịch:", error);
    res.status(500).json({ error: "Lỗi khi cập nhật giao dịch" });
  }
};

export const searchProductByName = async (req, res) => {
  try {
    const { pro_name } = req.query;

    if (!pro_name) {
      return res.status(400).json({ error: "Thiếu tham số pro_name" });
    }

    const requestRef = database.ref("products");
    const snapshot = await requestRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Không có dữ liệu" });
    }

    const products = snapshot.val();

    // Lọc sản phẩm theo tên và chỉ lấy `pro_name`
    const filteredProductNames = Object.values(products)
      .filter((product) =>
        product.pro_name.toLowerCase().includes(pro_name.toLowerCase())
      )
      .map((product) => product.pro_name); // Chỉ lấy `pro_name`

    res.json(filteredProductNames);
  } catch (error) {
    console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    res.status(500).json({ error: "Lỗi khi tìm kiếm sản phẩm" });
  }
};

export const getAllProductNames = async (req, res) => {
  try {
    const requestRef = database.ref("products");
    const snapshot = await requestRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Không có dữ liệu" });
    }

    const products = snapshot.val();
    const productNames = Object.values(products).map((product) => product.pro_name);

    res.json(productNames);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tên sản phẩm:", error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách tên sản phẩm" });
  }
};

