import { Router } from "express";
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from "./location.controller.js";

const router = Router();

router.get("/locations", getAllLocations);
router.get("/locations/:id", getLocationById);
router.post("/locations", createLocation);
router.put("/locations/:id", updateLocation);
router.delete("/locations/:id", deleteLocation);

export default router;
