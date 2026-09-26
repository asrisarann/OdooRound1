import Router from "express";
import { getAllStock, addStock } from "./stock.controller.js";

const router = Router();

router.get("/stock", getAllStock);
router.post("/stock", addStock);


export default router;