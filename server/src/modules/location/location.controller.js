import prisma from "../../config/prisma.js";

const VALID_LOCATION_TYPES = [
  "WAREHOUSE",
  "RACK",
  "BIN",
  "PRODUCTION",
  "RECEIVING",
  "SHIPPING",
];

// GET /api/locations - Get all locations (supports ?warehouseId=...&type=...)
export const getAllLocations = async (req, res) => {
  try {
    const { warehouseId, type } = req.query;

    const where = {};
    if (warehouseId) where.warehouseId = warehouseId;
    if (type) where.type = type;

    const locations = await prisma.location.findMany({
      where,
      include: {
        warehouse: {
          select: { id: true, name: true, code: true },
        },
        parent: {
          select: { id: true, name: true, code: true },
        },
        children: {
          select: { id: true, name: true, code: true, type: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, data: locations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/locations/:id - Single location details
export const getLocationById = async (req, res) => {
  try {
    const location = await prisma.location.findUnique({
      where: { id: req.params.id },
      include: {
        warehouse: true,
        parent: true,
        children: true,
      },
    });

    if (!location) {
      return res.status(404).json({ success: false, message: "Location not found" });
    }

    return res.status(200).json({ success: true, data: location });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/locations - Create a new location
export const createLocation = async (req, res) => {
  try {
    const { warehouseId, parentId, name, code, type, isActive } = req.body;

    if (!warehouseId || !name || !code || !type) {
      return res.status(400).json({
        success: false,
        message: "warehouseId, name, code, and type are required",
      });
    }

    if (!VALID_LOCATION_TYPES.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid location type. Allowed: ${VALID_LOCATION_TYPES.join(", ")}`,
      });
    }

    // Verify warehouse exists
    const warehouse = await prisma.warehouse.findUnique({ where: { id: warehouseId } });
    if (!warehouse) {
      return res.status(404).json({ success: false, message: "Warehouse does not exist" });
    }

    const cleanCode = code.trim().toUpperCase();

    // Check code uniqueness within warehouse
    const existing = await prisma.location.findUnique({
      where: {
        warehouseId_code: {
          warehouseId,
          code: cleanCode,
        },
      },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Location code '${cleanCode}' already exists in this warehouse`,
      });
    }

    const location = await prisma.location.create({
      data: {
        warehouseId,
        parentId: parentId || null,
        name: name.trim(),
        code: cleanCode,
        type,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
      include: {
        warehouse: { select: { id: true, name: true, code: true } },
        parent: { select: { id: true, name: true, code: true } },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Location created successfully",
      data: location,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/locations/:id - Update location
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, type, parentId, isActive } = req.body;

    const location = await prisma.location.findUnique({ where: { id } });
    if (!location) {
      return res.status(404).json({ success: false, message: "Location not found" });
    }

    if (type && !VALID_LOCATION_TYPES.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid location type. Allowed: ${VALID_LOCATION_TYPES.join(", ")}`,
      });
    }

    const updated = await prisma.location.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(code && { code: code.trim().toUpperCase() }),
        ...(type && { type }),
        ...(parentId !== undefined && { parentId: parentId || null }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Location updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/locations/:id - Delete location
export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const location = await prisma.location.findUnique({ where: { id } });
    if (!location) {
      return res.status(404).json({ success: false, message: "Location not found" });
    }

    await prisma.location.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: "Location deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
