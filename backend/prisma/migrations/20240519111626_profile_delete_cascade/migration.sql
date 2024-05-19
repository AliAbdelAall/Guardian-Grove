-- DropForeignKey
ALTER TABLE `parent` DROP FOREIGN KEY `Parent_profileId_fkey`;

-- AddForeignKey
ALTER TABLE `Parent` ADD CONSTRAINT `Parent_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
