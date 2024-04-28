/*
  Warnings:

  - Added the required column `profilePic` to the `Child` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `child` ADD COLUMN `profilePic` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `passwordreset` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- RedefineIndex
CREATE UNIQUE INDEX `_parenttopsychologist_AB_unique` ON `_parenttopsychologist`(`A`, `B`);
DROP INDEX `_ParentToPsychologist_AB_unique` ON `_parenttopsychologist`;

-- RedefineIndex
CREATE INDEX `_parenttopsychologist_B_index` ON `_parenttopsychologist`(`B`);
DROP INDEX `_ParentToPsychologist_B_index` ON `_parenttopsychologist`;
