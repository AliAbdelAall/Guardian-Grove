-- AlterTable
ALTER TABLE `passwordreset` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `profilePic` VARCHAR(191) NOT NULL DEFAULT 'default-profile';
