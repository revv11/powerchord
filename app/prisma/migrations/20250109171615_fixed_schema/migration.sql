-- DropForeignKey
ALTER TABLE "ConvoParticipant" DROP CONSTRAINT "ConvoParticipant_userId_fkey";

-- AlterTable
ALTER TABLE "ConvoParticipant" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "ConvoParticipant" ADD CONSTRAINT "ConvoParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
