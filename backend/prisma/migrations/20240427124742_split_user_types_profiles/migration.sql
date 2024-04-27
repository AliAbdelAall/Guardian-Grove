/*
  Warnings:

  - You are about to drop the column `school` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `speciality` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `yearsOfExperience` on the `profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `child` DROP FOREIGN KEY `Child_parentId_fkey`;

-- AlterTable
ALTER TABLE `child` ADD COLUMN `teacherId` INTEGER NULL;

-- AlterTable
ALTER TABLE `passwordreset` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ALTER COLUMN `expiresAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `school`,
    DROP COLUMN `speciality`,
    DROP COLUMN `yearsOfExperience`;

-- CreateTable
CREATE TABLE `Parent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profileId` INTEGER NOT NULL,

    UNIQUE INDEX `Parent_profileId_key`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Psychologist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `speciality` VARCHAR(191) NULL,
    `yearsOfExperience` INTEGER NULL,
    `profileId` INTEGER NOT NULL,

    UNIQUE INDEX `Psychologist_profileId_key`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teacher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school` VARCHAR(191) NULL,
    `profileId` INTEGER NOT NULL,

    UNIQUE INDEX `Teacher_profileId_key`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ParentToPsychologist` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ParentToPsychologist_AB_unique`(`A`, `B`),
    INDEX `_ParentToPsychologist_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Parent` ADD CONSTRAINT `Parent_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Psychologist` ADD CONSTRAINT `Psychologist_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Parent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ParentToPsychologist` ADD CONSTRAINT `_ParentToPsychologist_A_fkey` FOREIGN KEY (`A`) REFERENCES `Parent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ParentToPsychologist` ADD CONSTRAINT `_ParentToPsychologist_B_fkey` FOREIGN KEY (`B`) REFERENCES `Psychologist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
