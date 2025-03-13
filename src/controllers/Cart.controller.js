import { admin, database } from "../data/firebaseConfig.js";

export const getCart = async (req, res) => {
  try {
    console.log("Có request đến /api/carts");
    const requestRef = database.ref("cart");
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

export const getCartById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return res.status(400).json({ error: "Thiếu userId" });
    }

    const snapshot = await database.ref(`carts/${id}`).once("value");

    if (!snapshot.exists()) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy giỏ hàng của user này" });
    }

    res.json(snapshot.val());
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
  }
};

export const addCart = async (req, res) => {
  try {
    const { userId, pro_ID } = req.body; // pro_ID là giá trị cần tìm

    // Lấy toàn bộ danh sách sản phẩm
    const productsSnapshot = await database.ref("products").once("value");

    if (!productsSnapshot.exists()) {
      return res.status(404).json({ msg: "Không có sản phẩm nào" });
    }

    let selectedProduct = null;
    console.log(productsSnapshot);

    // Duyệt qua từng sản phẩm trong danh sách
    productsSnapshot.forEach((childSnapshot) => {
      const productData = childSnapshot.val();
      if (productData.pro_ID === pro_ID) {
        selectedProduct = { id: childSnapshot.key, ...productData };
      }
    });

    if (!selectedProduct) {
      return res.status(404).json({ msg: "Sản phẩm không tồn tại" });
    }

    // Kiểm tra userId có tồn tại không
    try {
      await admin.auth().getUser(userId);
    } catch (error) {
      return res.status(400).json({ msg: "Người dùng không tồn tại" });
    }

    const cartRef = database.ref(`carts/${userId}`);
    const cartSnapshot = await cartRef.once("value");
    let itemExists = false;

    if (cartSnapshot.exists()) {
      cartSnapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        if (item.pro_ID === pro_ID) {
          // **Sản phẩm đã tồn tại, cập nhật số lượng**
          const itemRef = database.ref(`carts/${userId}/${childSnapshot.key}`);
          itemRef.update({ pro_quantity: item.pro_quantity + 1 });
          itemExists = true;
        }
      });
    }

    if (!itemExists) {
      // **Sản phẩm chưa có, thêm mới**
      const newItemRef = cartRef.push();
      await newItemRef.set({
        pro_ID: selectedProduct.proID,
        pro_name: selectedProduct.pro_name,
        pro_price: selectedProduct.pro_price,
        pro_img: selectedProduct.pro_img,
        pro_quantity: 1, // Mặc định số lượng 1 nếu mới thêm
      });
    }

    res.status(200).json({ msg: "Thêm vào giỏ hàng thành công" });
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};
