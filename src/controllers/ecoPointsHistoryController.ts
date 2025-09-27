import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEcoPointsHistory = async (req: Request, res: Response) => {
  try {
    const history = await prisma.ecoPointsHistory.findMany();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial de puntos' });
  }
};

export const createEcoPointsHistory = async (req: Request, res: Response) => {
  try {
    const { userId, change, reason } = req.body;
    const ecoPoint = await prisma.ecoPointsHistory.create({
      data: { userId, change, reason }
    });
    res.status(201).json(ecoPoint);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear historial de puntos' });
  }
};

export const updateEcoPointsHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { change, reason } = req.body;
    const ecoPoint = await prisma.ecoPointsHistory.update({
      where: { id: Number(id) },
      data: { change, reason }
    });
    res.json(ecoPoint);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar historial de puntos' });
  }
};

export const deleteEcoPointsHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.ecoPointsHistory.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar historial de puntos' });
  }
};
