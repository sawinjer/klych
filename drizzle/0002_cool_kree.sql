CREATE TABLE "klych" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author_id" text NOT NULL,
	"category" "category" DEFAULT 'other' NOT NULL,
	"cover_image" text NOT NULL,
	"requiresSpecialSkills" boolean DEFAULT false NOT NULL,
	"online" boolean DEFAULT false NOT NULL,
	"location_name" text,
	"location_lng" numeric,
	"location_lat" numeric,
	"datetime_of_occurance" timestamp NOT NULL,
	"required_peoples_amount" numeric NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "klych" ADD CONSTRAINT "klych_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;