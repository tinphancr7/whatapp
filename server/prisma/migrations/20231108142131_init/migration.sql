-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "message" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "text" SET DEFAULT 'text';
