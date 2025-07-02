ALTER TABLE "rate" RENAME TO "vote";--> statement-breakpoint
ALTER TABLE "vote" DROP CONSTRAINT "rate_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "vote" DROP CONSTRAINT "rate_comment_id_comment_id_fk";
--> statement-breakpoint
DROP INDEX "idx_rate_comment_like";--> statement-breakpoint
DROP INDEX "idx_rate_user_comment";--> statement-breakpoint
ALTER TABLE "vote" DROP CONSTRAINT "rate_user_id_comment_id_pk";--> statement-breakpoint
ALTER TABLE "vote" ADD CONSTRAINT "vote_user_id_comment_id_pk" PRIMARY KEY("user_id","comment_id");--> statement-breakpoint
ALTER TABLE "vote" ADD CONSTRAINT "vote_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vote" ADD CONSTRAINT "vote_comment_id_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_vote_comment_like" ON "vote" USING btree ("comment_id","like");--> statement-breakpoint
CREATE INDEX "idx_vote_user_comment" ON "vote" USING btree ("user_id","comment_id");