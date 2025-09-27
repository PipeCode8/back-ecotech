import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Criterio = {
  tipo: string;
  cantidad: number;
  [key: string]: any;
};

export async function checkAndAssignAchievements(userId: number) {
  // Cuenta las recolecciones del usuario
  const totalRecolecciones = await prisma.solicitud.count({ where: { userId } });

  // Trae todos los logros activos de tipo "recolecciones"
  const achievements = await prisma.achievement.findMany({
    where: { activo: true, criterio: { path: ['tipo'], equals: 'recolecciones' } }
  });

  for (const achievement of achievements) {
    let required: number | null = null;
    let criterio: Criterio | null = null;

    // Prisma puede devolver el campo criterio como un objeto, string, etc.
    if (achievement.criterio && typeof achievement.criterio === 'object' && !Array.isArray(achievement.criterio)) {
      criterio = achievement.criterio as Criterio;
      if (typeof criterio.cantidad === 'number') {
        required = criterio.cantidad;
      }
    }

    if (required === null) continue; // Salta si no hay criterio válido

    // ¿Ya tiene el logro?
    const already = await prisma.userAchievement.findFirst({
      where: { userId, achievementId: achievement.id }
    });
    if (!already && totalRecolecciones >= required) {
      await prisma.userAchievement.create({
        data: { userId, achievementId: achievement.id }
      });
    }
  }
}