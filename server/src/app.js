import "dotenv/config";
import express from "express";
import cors from "cors";

import warehouseRoutes from "./modules/warehouse/warehouse.routes.js";
import receiptRoutes from "./modules/receipt/receipt.routes.js";
import stockRoutes from "./modules/stock/stock.route.js";
import deliveryRoutes from "./modules/delivery/delivery.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send({ message: "Server alive" });
});

// API Routes
app.use("/api", warehouseRoutes);
app.use("/api", receiptRoutes);
app.use("/api", stockRoutes);
app.use("/api", deliveryRoutes);

export default app;
