import { InferSelectModel, relations } from "drizzle-orm";
import {
  AnyPgColumn,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";import { folderSchema } from "./folder";
;

export const fileSchema = pgTable("fileSchema", {
  id: serial("id").primaryKey(),
  folderId: integer("folder_id").references(() => folderSchema.id),
  name: varchar("name", { length: 20 }).notNull().unique(),
  size: integer("size").notNull(),
  extension: varchar("extension", { length: 10 }).notNull(),
  linkUrl: varchar("linkUrl", { length: 100 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const fileRelations = relations(fileSchema, ({ one }) => ({
  folder: one(folderSchema, {
    fields: [fileSchema.folderId],
    references: [folderSchema.id],
  }),
}));

export const fileSchemaType = createInsertSchema(fileSchema, {}).pick({
  folderId: true,
  name: true,
  size: true,
  extension: true,
  linkUrl: true,
});
export type FileSchema = z.infer<typeof fileSchemaType>;
export type SelectFileModel = InferSelectModel<typeof fileSchema>;
