import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const getAllAchievements = async (_req: Request, res: Response) => {
  const achievements = await prisma.achievement.findMany();
  res.json(achievements);
};

export const getUserAchievements = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  if (!userId) return res.status(400).json({ error: 'userId inválido' });
  const userAchievements = await prisma.userAchievement.findMany({
    where: { userId },
    include: { achievement: true }
  });
  res.json(userAchievements);
};