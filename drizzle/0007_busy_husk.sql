CREATE TYPE "public"."respond_status" AS ENUM('pending', 'accepted', 'declined');--> statement-breakpoint
CREATE TABLE "klych_responds" (
	"id" text PRIMARY KEY NOT NULL,
	"klych_id" text NOT NULL,
	"author_id" text NOT NULL,
	"status" "respond_status" DEFAULT 'pending'
);
--> statement-breakpoint
ALTER TABLE "klych_responds" ADD CONSTRAINT "klych_responds_klych_id_klych_id_fk" FOREIGN KEY ("klych_id") REFERENCES "public"."klych"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "klych_responds" ADD CONSTRAINT "klych_responds_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;