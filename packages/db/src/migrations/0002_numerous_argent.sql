ALTER TABLE "comment" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE "guestbook" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE "guestbook" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE "likes_session" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP(3);