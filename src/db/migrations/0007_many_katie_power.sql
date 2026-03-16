ALTER TABLE "careers" ADD COLUMN "sanity_slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "careers" ADD CONSTRAINT "careers_sanity_slug_unique" UNIQUE("sanity_slug");