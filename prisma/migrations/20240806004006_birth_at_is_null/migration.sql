/*
  Warnings:

  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `birthAt` DATE NULL;
