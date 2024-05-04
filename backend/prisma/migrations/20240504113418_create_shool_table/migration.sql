/*
  Warnings:

  - You are about to drop the column `school` on the `teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `child` ADD COLUMN `schoolId` INTEGER NULL,
    MODIFY `profilePic` VARCHAR(191) NOT NULL DEFAULT 'default-profile.png';

-- AlterTable
ALTER TABLE `review` MODIFY `rating` DOUBLE NULL;

-- AlterTable
ALTER TABLE `teacher` DROP COLUMN `school`,
    ADD COLUMN `schoolId` INTEGER NULL;

-- CreateTable
CREATE TABLE `School` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `School_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScheduledMeeting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,
    `psychologistId` INTEGER NOT NULL,
    `parentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduledMeeting` ADD CONSTRAINT `ScheduledMeeting_psychologistId_fkey` FOREIGN KEY (`psychologistId`) REFERENCES `Psychologist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduledMeeting` ADD CONSTRAINT `ScheduledMeeting_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Parent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
