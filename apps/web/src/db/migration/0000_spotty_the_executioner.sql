CREATE TABLE `account` (
	`user_id` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`provider_account_id` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(255),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_provider_account_id_pk` PRIMARY KEY(`provider`,`provider_account_id`)
);
--> statement-breakpoint
CREATE TABLE `comment_upvote` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`comment_id` varchar(255) NOT NULL,
	CONSTRAINT `comment_upvote_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `comment` (
	`id` varchar(255) NOT NULL,
	`body` varchar(1024) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	`post_id` varchar(255) NOT NULL,
	`parent_id` varchar(255),
	`is_deleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `comment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `guestbook` (
	`id` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`image` varchar(255),
	`body` varchar(1024) NOT NULL,
	`created_by` varchar(255) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `guestbook_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `likes_session` (
	`id` varchar(255) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`likes` int NOT NULL DEFAULT 0,
	CONSTRAINT `likes_session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `post` (
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`slug` varchar(255) NOT NULL,
	`likes` int NOT NULL DEFAULT 0,
	`views` int NOT NULL DEFAULT 0,
	CONSTRAINT `post_slug` PRIMARY KEY(`slug`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`session_token` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires` timestamp(3) NOT NULL,
	CONSTRAINT `session_session_token` PRIMARY KEY(`session_token`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`email_verified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verification_token` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp(3) NOT NULL,
	CONSTRAINT `verification_token_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comment_upvote` ADD CONSTRAINT `comment_upvote_comment_id_comment_id_fk` FOREIGN KEY (`comment_id`) REFERENCES `comment`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;

