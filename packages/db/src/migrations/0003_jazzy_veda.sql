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

CREATE OR REPLACE FUNCTION update_comment_reply_count() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.parent_id IS NOT NULL THEN
    UPDATE comment SET reply_count = reply_count + 1 WHERE id = NEW.parent_id;
  ELSIF TG_OP = 'DELETE' AND OLD.parent_id IS NOT NULL THEN
    UPDATE comment SET reply_count = reply_count - 1 WHERE id = OLD.parent_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_comment_rate_counts() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.like = true THEN
      UPDATE comment SET like_count = like_count + 1 WHERE id = NEW.comment_id;
    ELSE
      UPDATE comment SET dislike_count = dislike_count + 1 WHERE id = NEW.comment_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.like = true THEN
      UPDATE comment SET like_count = like_count - 1 WHERE id = OLD.comment_id;
    ELSE
      UPDATE comment SET dislike_count = dislike_count - 1 WHERE id = OLD.comment_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.like = true AND NEW.like = false THEN
      UPDATE comment SET like_count = like_count - 1, dislike_count = dislike_count + 1 WHERE id = NEW.comment_id;
    ELSIF OLD.like = false AND NEW.like = true THEN
      UPDATE comment SET like_count = like_count + 1, dislike_count = dislike_count - 1 WHERE id = NEW.comment_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_comment_reply_count_trigger ON comment;
CREATE TRIGGER update_comment_reply_count_trigger
AFTER INSERT OR DELETE ON comment
FOR EACH ROW EXECUTE FUNCTION update_comment_reply_count();

DROP TRIGGER IF EXISTS update_comment_rate_counts_trigger ON rate;
CREATE TRIGGER update_comment_rate_counts_trigger
AFTER INSERT OR UPDATE OR DELETE ON rate
FOR EACH ROW EXECUTE FUNCTION update_comment_rate_counts();

UPDATE comment c SET reply_count = (SELECT COUNT(*) FROM comment r WHERE r.parent_id = c.id);
UPDATE comment c SET
  like_count = (SELECT COUNT(*) FROM rate r WHERE r.comment_id = c.id AND r.like = true),
  dislike_count = (SELECT COUNT(*) FROM rate r WHERE r.comment_id = c.id AND r.like = false);
