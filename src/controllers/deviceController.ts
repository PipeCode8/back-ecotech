import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDevices = async (req: Request, res: Response) => {
  try {
    const devices = await prisma.device.findMany();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener dispositivos' });
  }
};

export const createDevice = async (req: Request, res: Response) => {
  try {
    const { name, type, status, ownerId } = req.body;
    const device = await prisma.device.create({
      data: { name, type, status, ownerId }
    });
    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear dispositivo' });
  }
};

export const updateDevice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, type, status, ownerId } = req.body;
    const device = await prisma.device.update({
      where: { id: Number(id) },
      data: { name, type, status, ownerId }
    });
    res.json(device);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar dispositivo' });
  }
};

export const deleteDevice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.device.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar dispositivo' });
  }
};
