CREATE TYPE "public"."klych_status" AS ENUM('active', 'finished');--> statement-breakpoint
ALTER TABLE "klych" ADD COLUMN "status" "klych_status" DEFAULT 'active' NOT NULL;