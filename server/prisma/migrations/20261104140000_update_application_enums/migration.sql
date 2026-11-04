-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ApplicationEventType" ADD VALUE 'INTERVIEW';
ALTER TYPE "ApplicationEventType" ADD VALUE 'WITHDRAWN';

-- AlterEnum
BEGIN;
UPDATE "applications"
SET "status" = 'INTERVIEW'
WHERE "status"::text IN ('TECHNICAL', 'FINAL');

UPDATE "applications"
SET "status" = 'WITHDRAWN'
WHERE "status"::text = 'ARCHIVED';

CREATE TYPE "ApplicationStatus_new" AS ENUM ('WISHLIST', 'APPLIED', 'HR_SCREEN', 'INTERVIEW', 'TAKE_HOME', 'OFFER', 'REJECTED', 'WITHDRAWN');
ALTER TABLE "public"."applications" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "applications" ALTER COLUMN "status" TYPE "ApplicationStatus_new" USING ("status"::text::"ApplicationStatus_new");
ALTER TYPE "ApplicationStatus" RENAME TO "ApplicationStatus_old";
ALTER TYPE "ApplicationStatus_new" RENAME TO "ApplicationStatus";
DROP TYPE "public"."ApplicationStatus_old";
ALTER TABLE "applications" ALTER COLUMN "status" SET DEFAULT 'APPLIED';
COMMIT;
