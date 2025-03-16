import { admin, database } from "../data/firebaseConfig.js";

// Lấy danh sách tất cả requests từ Firebase
export const getRequests = async (req, res) => {
  try {
    const requestRef = database.ref("customers");
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

export const getUserInfo = async (req, res) => {
  const userId = req.params.id;
  try {
    const snapshot = await database
      .ref("customers")
      .orderByChild("cus_id")
      .equalTo(userId)
      .once("value");

    if (!snapshot.exists()) {
      console.log("❌ Không tìm thấy user với cus_id:", cusId);
      return res.status(404).json({ message: "User not found" });
    }

    const userData = Object.values(snapshot.val())[0];

    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
