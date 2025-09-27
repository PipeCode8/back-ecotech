import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCollections = async (req: Request, res: Response) => {
  try {
    const collections = await prisma.collection.findMany();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener colecciones' });
  }
};

export const createCollection = async (req: Request, res: Response) => {
  try {
    const { userId, items, status, points } = req.body;
    const collection = await prisma.collection.create({
      data: { userId, items, status, points }
    });
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear colección' });
  }
};

export const updateCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { items, status, points } = req.body;
    const collection = await prisma.collection.update({
      where: { id: Number(id) },
      data: { items, status, points }
    });
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar colección' });
  }
};

export const deleteCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.collection.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar colección' });
  }
};
