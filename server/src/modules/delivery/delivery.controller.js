import prisma from "../../config/prisma.js";

export const getalldevilery = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.max(1, parseInt(req.query.limit || "10", 10));
    const skip = (page - 1) * limit;

    const { status, search } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { deliveryNumber: { contains: search, mode: "insensitive" } },
        { customerName: { contains: search, mode: "insensitive" } },
      ];
    }

    const [total, deliveries] = await Promise.all([
      prisma.delivery.count({ where }),
      prisma.delivery.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          createdBy: {
            select: { id: true, name: true, email: true },
          },
          items: {
            include: {
              product: {
                select: { id: true, name: true, sku: true, unit: true },
              },
              location: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                  warehouse: {
                    select: { id: true, name: true, code: true },
                  },
                },
              },
            },
          },
        },
      }),
    ]);

    return res.status(200).json({
      message: "Deliveries fetched successfully",
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: deliveries,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to fetch deliveries",
    });
  }
};

