import "dotenv/config";
import express from "express";
import cors from "cors";
import warehouseRoutes from "./module/warehouse/warehouse.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send({ message: "Server alive" });
});

// Warehouse module
app.use("/api", warehouseRoutes);

export default app;
