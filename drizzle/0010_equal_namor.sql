ALTER TABLE "klych_likes" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "klych_responds" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;