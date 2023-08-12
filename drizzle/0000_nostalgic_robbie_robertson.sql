CREATE TABLE `posts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`slug` varchar(256) NOT NULL,
	`views` int NOT NULL DEFAULT 0,
	`language` enum('en','es') NOT NULL DEFAULT 'en',
	CONSTRAINT `posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `posts_slug_unique` UNIQUE(`slug`),
	CONSTRAINT `slug_idx` UNIQUE(`slug`)
);
