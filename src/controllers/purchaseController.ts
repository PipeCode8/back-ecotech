import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await prisma.purchase.findMany();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener compras' });
  }
};

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { userId, item, price, points } = req.body;
    const purchase = await prisma.purchase.create({
      data: { userId, item, price, points }
    });
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear compra' });
  }
};

export const updatePurchase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { item, price, points } = req.body;
    const purchase = await prisma.purchase.update({
      where: { id: Number(id) },
      data: { item, price, points }
    });
    res.json(purchase);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar compra' });
  }
};

export const deletePurchase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.purchase.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar compra' });
  }
};
