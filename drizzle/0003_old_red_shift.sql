ALTER TABLE "klych" ADD COLUMN "location" geometry(point);--> statement-breakpoint
ALTER TABLE "klych" DROP COLUMN "location_lng";--> statement-breakpoint
ALTER TABLE "klych" DROP COLUMN "location_lat";