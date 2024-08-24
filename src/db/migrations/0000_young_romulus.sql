CREATE TABLE IF NOT EXISTS "fileSchema" (
	"id" serial PRIMARY KEY NOT NULL,
	"folder_id" integer,
	"name" varchar(20) NOT NULL,
	"size" integer NOT NULL,
	"extension" varchar(10) NOT NULL,
	"linkUrl" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "fileSchema_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "folderSchema" (
	"id" serial PRIMARY KEY NOT NULL,
	"parentFolder_id" integer,
	"name" varchar(20) NOT NULL,
	"size" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "folderSchema_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fileSchema" ADD CONSTRAINT "fileSchema_folder_id_folderSchema_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."folderSchema"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folderSchema" ADD CONSTRAINT "folderSchema_parentFolder_id_folderSchema_id_fk" FOREIGN KEY ("parentFolder_id") REFERENCES "public"."folderSchema"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
