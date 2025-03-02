ALTER TABLE "user" ALTER COLUMN "name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "rate" ADD CONSTRAINT "rate_user_id_comment_id_pk" PRIMARY KEY("user_id","comment_id");