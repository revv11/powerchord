-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_fromId_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_toId_fkey";

-- AlterTable
ALTER TABLE "Messages" ALTER COLUMN "fromId" SET DATA TYPE TEXT,
ALTER COLUMN "toId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
