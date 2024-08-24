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
import { z } from "zod";
import { fileSchema } from "./file";

export const folderSchema = pgTable("folderSchema", {
  id: serial("id").primaryKey(),
  parentId: integer("parentFolder_id").references(
    (): AnyPgColumn => folderSchema.id
  ),
  name: varchar("name", { length: 20 }).notNull().unique(),
  size: integer("size").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const folderRelations = relations(folderSchema, ({ one, many }) => ({
  files: many(fileSchema),
}));

export const folderSchemaType = createInsertSchema(folderSchema, {}).pick({
  name: true,
  size: true,
});
export type FolderSchema = z.infer<typeof folderSchemaType>;
export type SelectFolderModel = InferSelectModel<typeof folderSchema>;
