import prisma from "../../config/prisma.js";

export const getAllStock = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }

    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.max(1, parseInt(req.query.limit || "10", 10));
    const skip = (page - 1) * limit;

    const [total, stocks] = await Promise.all([
      prisma.stock.count(),
      prisma.stock.findMany({
        skip,
        take: limit,
        include: {
          product: true,
          location: {
            include: {
              warehouse: true,
            },
          },
        },
      }),
    ]);

    return res.status(200).json({
      message: "Stock fetched successfully",
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: stocks,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to fetch stock",
    });
  }
};


export const addStock = async (req, res) => {
  try {
    const { productId, locationId, quantity, type, referenceType, referenceId } = req.body;

    if (!productId || !locationId || quantity === undefined) {
      return res.status(400).json({
        message: "productId, locationId, and quantity are required",
      });
    }

    const qtyNumber = Number(quantity);
    if (isNaN(qtyNumber) || qtyNumber <= 0) {
      return res.status(400).json({
        message: "quantity must be a positive number",
      });
    }

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Verify location exists
    const location = await prisma.location.findUnique({
      where: { id: locationId },
    });
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    // Transaction to update stock and record audit ledger entry
    const result = await prisma.$transaction(async (tx) => {
      const existingStock = await tx.stock.findUnique({
        where: {
          productId_locationId: { productId, locationId },
        },
      });

      const currentQty = existingStock ? Number(existingStock.quantity) : 0;
      const newQty = currentQty + qtyNumber;

      const stock = await tx.stock.upsert({
        where: {
          productId_locationId: { productId, locationId },
        },
        update: {
          quantity: newQty,
        },
        create: {
          productId,
          locationId,
          quantity: qtyNumber,
        },
        include: {
          product: true,
          location: {
            include: {
              warehouse: true,
            },
          },
        },
      });

      // Record in StockLedger for move history
      await tx.stockLedger.create({
        data: {
          productId,
          locationId,
          type: type || "ADJUSTMENT_IN",
          quantity: qtyNumber,
          quantityBefore: currentQty,
          quantityAfter: newQty,
          referenceType: referenceType || "MANUAL_ENTRY",
          referenceId: referenceId || null,
        },
      });

      return stock;
    });

    return res.status(201).json({
      message: "Stock added successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to add stock",
    });
  }
};

