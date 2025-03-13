import express, { json } from "express";
import cors from "cors";
import cateRoutes from "./src/routes/Categories.route.js";
import proRoutes from "./src/routes/Products.route.js";
import cusRoutes from "./src/routes/Customers.route.js";
import orderRoutes from "./src/routes/Orderpro.route.js";
import cartRoute from "./src/routes/Cart.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/api", cartRoute);
app.use("/api", cateRoutes);
app.use("/api", proRoutes);
app.use("/api", cusRoutes);
app.use("/api", orderRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
