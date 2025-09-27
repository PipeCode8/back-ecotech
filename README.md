# EcoTech Backend

Backend desarrollado en TypeScript, Express y Prisma para la gestión de usuarios, colecciones, compras, dispositivos y puntos ecológicos.

## Estructura
- Autenticación con JWT
- CRUD para todas las entidades principales
- Protección por roles (admin/client)
- Dashboard con estadísticas

## Instalación
1. Clona el repositorio
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Configura tu base de datos en `.env`
4. Ejecuta migraciones Prisma:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
5. Inicia el servidor:
   ```bash
   npm run dev
   ```

## Endpoints principales
- `/auth/register` y `/auth/login`
- `/users`, `/collections`, `/purchases`, `/devices`, `/eco-points-history` (CRUD, protegidos)
- `/dashboard/stats` (protegido)

## Documentación adicional
- Verifica el archivo `copilot-instructions.md` en `.github` para instrucciones de desarrollo y checklist.
