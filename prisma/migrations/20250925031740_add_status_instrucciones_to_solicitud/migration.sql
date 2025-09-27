-- AlterTable
ALTER TABLE "Solicitud" ADD COLUMN     "instrucciones" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pendiente';
