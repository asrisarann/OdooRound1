import { Router } from "express";
import {
  getalldevilery,
  getDeliveryById,
  createDelivery,
  updateDelivery,
  checkAvailability,
  validateDelivery,
  cancelDelivery,
} from "./delivery.controller.js";

const router = Router();

// List & Details
router.get("/delivery", getalldevilery);
router.get("/delivery/:id", getDeliveryById);

// Creation & Modification
router.post("/delivery", createDelivery);
router.put("/delivery/:id", updateDelivery);

// State Transition Actions matching Wireframe
router.patch("/delivery/:id/check-availability", checkAvailability); // Checks stock -> moves to READY or WAITING
router.post("/delivery/:id/validate", validateDelivery);            // "Validate" button -> decreases stock, moves to DONE
router.patch("/delivery/:id/cancel", cancelDelivery);                // "Cancel" button -> moves to CANCELED

export default router;