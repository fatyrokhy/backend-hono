/*
  Warnings:

  - A unique constraint covering the columns `[telephone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'https://example.com/default-profile.jpg',
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "User_telephone_key" ON "public"."User"("telephone");
