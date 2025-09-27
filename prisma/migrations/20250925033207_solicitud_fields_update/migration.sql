/*
  Warnings:

  - You are about to drop the column `direccion` on the `Solicitud` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Solicitud` table. All the data in the column will be lost.
  - You are about to drop the column `instrucciones` on the `Solicitud` table. All the data in the column will be lost.
  - You are about to drop the column `producto` on the `Solicitud` table. All the data in the column will be lost.
  - Added the required column `address` to the `Solicitud` table without a default value. This is not possible if the table is not empty.
  - Added the required column `items` to the `Solicitud` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredDate` to the `Solicitud` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredTime` to the `Solicitud` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Solicitud" DROP COLUMN "direccion",
DROP COLUMN "fecha",
DROP COLUMN "instrucciones",
DROP COLUMN "producto",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "items" JSONB NOT NULL,
ADD COLUMN     "preferredDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "preferredTime" TEXT NOT NULL,
ADD COLUMN     "specialInstructions" TEXT;
