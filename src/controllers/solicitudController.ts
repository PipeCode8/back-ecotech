import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { checkAndAssignAchievements } from '../utils/achievementUtils';

const prisma = new PrismaClient();

export const createSolicitud = async (req: Request, res: Response) => {
  try {
    console.log('Body recibido en solicitud:', req.body);

    const {
      userId,
      address,
      preferredDate,
      preferredTime,
      specialInstructions,
      status,
      items
    } = req.body;

    const parsedUserId = Number(userId);
    if (!parsedUserId || isNaN(parsedUserId)) {
      return res.status(400).json({ error: 'userId es requerido y debe ser un número válido' });
    }

    // Validar que el usuario existe antes de crear la solicitud
    const userExists = await prisma.user.findUnique({ where: { id: parsedUserId } });
    if (!userExists) {
      return res.status(404).json({ error: 'El usuario no existe en la base de datos' });
    }

    const solicitud = await prisma.solicitud.create({
        data: {
          userId: parsedUserId,
          address: String(address),
          preferredDate: new Date(preferredDate),
          preferredTime: String(preferredTime),
          specialInstructions: specialInstructions ? String(specialInstructions) : undefined,
          status: status ? String(status) : undefined,
          items: typeof items === 'string' ? JSON.parse(items) : items
        }
    });

    // Llama a la función de logros después de crear la solicitud
    await checkAndAssignAchievements(parsedUserId);

    console.log('Solicitud creada:', solicitud);
    res.status(201).json(solicitud);
  } catch (error) {
    console.error('Error al crear la solicitud:', error);
    res.status(500).json({ error: 'Error al crear la solicitud' });
  }
};

export const getSolicitudes = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    let solicitudes;
    if (userId) {
      const parsedUserId = Number(userId);
      if (!parsedUserId || isNaN(parsedUserId)) {
        return res.status(400).json({ error: 'userId debe ser un número válido' });
      }
      solicitudes = await prisma.solicitud.findMany({ where: { userId: parsedUserId } });
    } else {
      solicitudes = await prisma.solicitud.findMany();
    }
    res.json(solicitudes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las solicitudes' });
  }
};
