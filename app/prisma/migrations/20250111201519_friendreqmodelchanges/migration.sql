-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'DECLINED';

-- AddForeignKey
ALTER TABLE "FriendReq" ADD CONSTRAINT "FriendReq_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
