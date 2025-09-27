import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalCollections = await prisma.collection.count();
    const totalPurchases = await prisma.purchase.count();
    const totalDevices = await prisma.device.count();
    const totalEcoPoints = await prisma.ecoPointsHistory.count();

    res.json({
      totalUsers,
      totalCollections,
      totalPurchases,
      totalDevices,
      totalEcoPoints
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas del dashboard' });
  }
};
