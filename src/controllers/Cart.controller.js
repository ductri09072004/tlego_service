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
    const { id } = req.params;  // userId
    if (!id) {
      return res.status(400).json({ error: "Thiếu userId" });
    }

    const snapshot = await database.ref(`carts/${id}`).once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Không tìm thấy giỏ hàng của user này" });
    }

    const cartData = snapshot.val();

    // Chuyển đổi dữ liệu để đảm bảo có cartProId
    const cartList = Object.entries(cartData).map(([cartProId, product]) => ({
      cartProId,  // Đảm bảo có cartProId trong API response
      ...product,
    }));

    res.json(cartList);
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
      console.log("Chưa tồn tại");
      // **Sản phẩm chưa có, thêm mới**
      const newItemRef = cartRef.push();
      await newItemRef.set({
        pro_ID: selectedProduct.pro_ID,
        pro_name: selectedProduct.pro_name,
        pro_price: selectedProduct.pro_price,
        pro_img: selectedProduct.pro_img,
        pro_quantity: 1,
      });
    }

    res.status(200).json({ msg: "Thêm vào giỏ hàng thành công" });
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { id } = req.params;
    await database.ref(`carts/${id}`).remove();
    console.log(`Đã xóa toàn bộ sản phẩm trong giỏ hàng của user ${id}`);
    return res.status(200).json({ message: "Xóa thành công!" });
  } catch (error) {
    console.error("Lỗi khi xóa giỏ hàng:", error);
  }
};

export const deleteCartId = async (req, res) => {
  const { userId, cartProId } = req.params; // cartProId là giá trị của pro_ID (71806)

  if (!userId || !cartProId) {
    return res.status(400).json({ message: "Thiếu userId hoặc pro_ID" });
  }

  try {
    const cartRef = database.ref(`carts/${userId}`);

    // Lấy danh sách sản phẩm của userId
    const snapshot = await cartRef.once("value");
    const cartData = snapshot.val();

    if (!cartData) {
      return res.status(404).json({ message: "Giỏ hàng trống hoặc không tồn tại." });
    }

    // Tìm key có `pro_ID` = cartProId (71806)
    let keyToDelete = null;
    Object.entries(cartData).forEach(([key, value]) => {
      if (value.pro_ID === cartProId) {
        keyToDelete = key;
      }
    });

    if (!keyToDelete) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm với pro_ID này." });
    }

    // Xóa sản phẩm theo key tìm được
    await database.ref(`carts/${userId}/${keyToDelete}`).remove();

    return res.status(200).json({ message: `Xóa sản phẩm có pro_ID: ${cartProId} thành công!` });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error: error.message });
  }
}

export const updateCartQuantity = async (req, res) => {
  try {
    const { userId, cartProId } = req.params;
    const { pro_quantity } = req.body;

    const quantityNumber = parseInt(pro_quantity);
    if (isNaN(quantityNumber) || quantityNumber < 1) {
      return res.status(400).json({ message: "Số lượng không hợp lệ" });
    }

    const cartRef = database.ref(`carts/${userId}/${cartProId}`);

    const snapshot = await cartRef.once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
    }

    await cartRef.update({ pro_quantity: quantityNumber });
    return res.status(200).json({ message: `Cập nhật số lượng sản phẩm ${cartProId} thành ${quantityNumber} thành công!` });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi khi cập nhật số lượng", error: error.message });
  }
}
