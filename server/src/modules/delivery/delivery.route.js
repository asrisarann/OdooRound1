import Router from "express";
import { getalldevilery } from "./delivery.controller.js";

const router = Router();

router.get("/delivery", getalldevilery);


export default router;