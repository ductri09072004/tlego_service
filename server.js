import express, { json } from "express";
import cors from "cors";
import cateRoutes from "./src/routes/Categories.route.js"; 
import proRoutes from "./src/routes/Products.route.js"; 
import cusRoutes from "./src/routes/Customers.route.js"; 
import orderRoutes from "./src/routes/Orderdetail.route.js"; 
import orderItemRoutes from "./src/routes/Orderitem.route.js"; 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

// Routes
app.use("/api", cateRoutes);
app.use("/api", proRoutes);
app.use("/api", cusRoutes);
app.use("/api", orderRoutes);
app.use("/api", orderItemRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
