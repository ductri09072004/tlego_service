import express, { json } from "express";
import cors from "cors";
import cateRoutes from "./src/routes/Categories.route.js"; 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

// Routes

app.use("/api", cateRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
