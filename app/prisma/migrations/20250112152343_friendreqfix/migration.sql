/*
  Warnings:

  - The primary key for the `FriendReq` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FriendReq` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FriendReq" DROP CONSTRAINT "FriendReq_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FriendReq_pkey" PRIMARY KEY ("senderId", "receiverId");
