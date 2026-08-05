CREATE TABLE "invite_tokens" (
	"token" text PRIMARY KEY NOT NULL,
	"participant_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "participants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"password_hash" text,
	"sanity_participant_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"password_set_at" timestamp with time zone,
	CONSTRAINT "participants_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "invite_tokens" ADD CONSTRAINT "invite_tokens_participant_id_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id") ON DELETE cascade ON UPDATE no action;