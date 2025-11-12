CREATE TABLE "klych_likes" (
	"id" text PRIMARY KEY NOT NULL,
	"klych_id" text NOT NULL,
	"author_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "klych_likes" ADD CONSTRAINT "klych_likes_klych_id_klych_id_fk" FOREIGN KEY ("klych_id") REFERENCES "public"."klych"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "klych_likes" ADD CONSTRAINT "klych_likes_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;