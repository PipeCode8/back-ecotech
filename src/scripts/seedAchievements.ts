import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.achievement.createMany({
    data: [
      {
        nombre: "Recolector Novato",
        descripcion: "Realiza tu primera recolección.",
        icono: "🥉",
        criterio: { tipo: "recolecciones", cantidad: 1 },
        activo: true,
      },
      {
        nombre: "Recolector Experto",
        descripcion: "Realiza 10 recolecciones.",
        icono: "🥈",
        criterio: { tipo: "recolecciones", cantidad: 10 },
        activo: true,
      },
      {
        nombre: "EcoPuntos 1000",
        descripcion: "Alcanza 1000 EcoPuntos.",
        icono: "🌱",
        criterio: { tipo: "puntos", cantidad: 1000 },
        activo: true,
      },
      {
        nombre: "Reciclador Constante",
        descripcion: "Realiza recolecciones durante 3 meses seguidos.",
        icono: "♻️",
        criterio: { tipo: "meses_consecutivos", cantidad: 3 },
        activo: true,
      },
    ],
    skipDuplicates: true,
  });
  console.log("Logros de ejemplo insertados.");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());