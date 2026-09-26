import prisma from "../../lib/prisma.js";

// GET /api/warehouses
export const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await prisma.warehouse.findMany({
      include: {
        _count: { select: { locations: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ success: true, data: warehouses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/warehouses/:id
export const getWarehouseById = async (req, res) => {
  try {
    const warehouse = await prisma.warehouse.findUnique({
      where: { id: req.params.id },
      include: { locations: true },
    });
    if (!warehouse) return res.status(404).json({ success: false, message: "Warehouse not found" });
    return res.status(200).json({ success: true, data: warehouse });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/warehouses
export const createWarehouse = async (req, res) => {
  try {
    const { name, code, address, isActive } = req.body;
    if (!name || !code) return res.status(400).json({ success: false, message: "Name and code are required" });

    const cleanCode = code.trim().toUpperCase();
    const existing = await prisma.warehouse.findUnique({ where: { code: cleanCode } });
    if (existing) return res.status(409).json({ success: false, message: `Code '${cleanCode}' already exists` });

    const warehouse = await prisma.warehouse.create({
      data: {
        name: name.trim(),
        code: cleanCode,
        address: address?.trim() || null,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });
    return res.status(201).json({ success: true, message: "Warehouse created", data: warehouse });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/warehouses/:id
export const updateWarehouse = async (req, res) => {
  try {
    const { name, code, address, isActive } = req.body;
    const warehouse = await prisma.warehouse.findUnique({ where: { id: req.params.id } });
    if (!warehouse) return res.status(404).json({ success: false, message: "Warehouse not found" });

    if (code && code.trim().toUpperCase() !== warehouse.code) {
      const cleanCode = code.trim().toUpperCase();
      const codeTaken = await prisma.warehouse.findUnique({ where: { code: cleanCode } });
      if (codeTaken) return res.status(409).json({ success: false, message: `Code '${cleanCode}' already in use` });
    }

    const updated = await prisma.warehouse.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name: name.trim() }),
        ...(code && { code: code.trim().toUpperCase() }),
        ...(address !== undefined && { address: address?.trim() || null }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
      },
    });
    return res.status(200).json({ success: true, message: "Warehouse updated", data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/warehouses/:id
export const deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await prisma.warehouse.findUnique({ where: { id: req.params.id } });
    if (!warehouse) return res.status(404).json({ success: false, message: "Warehouse not found" });

    await prisma.warehouse.delete({ where: { id: req.params.id } });
    return res.status(200).json({ success: true, message: "Warehouse deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
