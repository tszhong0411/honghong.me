-- Custom SQL migration file, put your code below! --
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