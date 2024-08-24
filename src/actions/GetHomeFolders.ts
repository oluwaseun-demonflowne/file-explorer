"use server";
import { db } from "@/db/connect";
import { folderSchema, SelectFolderModel } from "@/db/schema/folder";
import { isNull, lt } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getPublicFiles(): Promise<SelectFolderModel[]> {
  const _cookies = cookies();
  const getPublicFolders = await db.query.folderSchema.findMany({
    where: isNull(folderSchema.parentId),
  });
  return getPublicFolders;
}
