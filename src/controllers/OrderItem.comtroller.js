import { database } from "../data/firebaseConfig.js";

// Lấy danh sách tất cả requests từ Firebase
export const getRequests = async (req, res) => {
  try {
    const requestRef = database.ref("orderitem");
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

export const addRequest = async (req, res) => {
  try {
    const { 
      order_id,
      order_price,
      order_quantity,
      pro_name,
     
    } = req.body;

    if (!order_id||!order_price||!pro_name||!order_quantity) {
      return res.status(400).json({ error: "Thiếu thông tin giao dịch" });
    }

    const requestRef = database.ref("orderitem").push();
    await requestRef.set({
      order_id,
      order_price,
      order_quantity,
      pro_name
    });

    res.status(201).json({ message: "Giao dịch đã được thêm", id: requestRef.key });
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

    const requestRef = database.ref(`orderitem/${id}`);
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
  
      const requestRef = database.ref(`orderitem/${id}`);
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

//xóa item theo id
export const deleteIDRequest = async (req, res) => {
  try {
    const { order_id } = req.params; // Nhận order_id từ URL

    if (!order_id) {
      return res.status(400).json({ error: "Thiếu orderitem_id" });
    }

    const orderRef = database.ref("orderitem");
    const snapshot = await orderRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Danh mục không tồn tại" });
    }

    let orderKeyToDelete = null;

    // Tìm key của đơn hàng có order_id tương ứng
    snapshot.forEach((childSnapshot) => {
      const orderData = childSnapshot.val();
      if (orderData.order_id === order_id) {
        orderKeyToDelete = childSnapshot.key;
      }
    });

    if (!orderKeyToDelete) {
      return res.status(404).json({ error: "Không tìm thấy đơn hàng với order_id này" });
    }

    // Xóa đơn hàng theo key
    await database.ref(`orderitem/${orderKeyToDelete}`).remove();

    res.status(200).json({ message: "Đơn hàng đã được xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa đơn hàng:", error);
    res.status(500).json({ error: "Lỗi khi xóa đơn hàng" });
  }
};

