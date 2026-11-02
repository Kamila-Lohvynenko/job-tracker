-- CreateEnum
CREATE TYPE "WorkLocation" AS ENUM ('REMOTE', 'HYBRID', 'ON_SITE', 'FLEXIBLE', 'OTHER');

-- AlterTable
ALTER TABLE "applications" RENAME COLUMN "location" TO "address";

-- AlterTable
ALTER TABLE "applications" ADD COLUMN "location" "WorkLocation";
