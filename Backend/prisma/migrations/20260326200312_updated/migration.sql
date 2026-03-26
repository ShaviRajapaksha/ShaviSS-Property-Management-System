/*
  Warnings:

  - You are about to drop the column `priceperNight` on the `Room` table. All the data in the column will be lost.
  - Added the required column `pricePerNight` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "priceperNight",
ADD COLUMN     "pricePerNight" DOUBLE PRECISION NOT NULL;
