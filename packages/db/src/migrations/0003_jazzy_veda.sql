ALTER TABLE "comment" ADD COLUMN "reply_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "comment" ADD COLUMN "like_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "comment" ADD COLUMN "dislike_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_comment_post_id" ON "comment" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "idx_comment_parent_id" ON "comment" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "idx_comment_user_id" ON "comment" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_comment_post_created" ON "comment" USING btree ("post_id","created_at" DESC NULLS LAST) WHERE "comment"."parent_id" IS NULL;--> statement-breakpoint
CREATE INDEX "idx_comment_parent_created" ON "comment" USING btree ("parent_id","created_at" DESC NULLS LAST) WHERE "comment"."parent_id" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_comment_body_search" ON "comment" USING gin (to_tsvector('english', "body"));--> statement-breakpoint
CREATE INDEX "idx_rate_comment_like" ON "rate" USING btree ("comment_id","like");--> statement-breakpoint
CREATE INDEX "idx_rate_user_comment" ON "rate" USING btree ("user_id","comment_id");--> statement-breakpoint
CREATE INDEX "idx_guestbook_created" ON "guestbook" USING btree ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "idx_guestbook_user_id" ON "guestbook" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_post_created" ON "post" USING btree ("created_at" DESC NULLS LAST);