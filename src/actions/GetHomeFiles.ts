"use server";
import { db } from "@/db/connect";
import { fileSchema, SelectFileModel } from "@/db/schema/file";
import { isNull } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getPublicFilesFile(): Promise<SelectFileModel[]> {
  const _cookies = cookies();
  const getPublicFiles = await db.query.fileSchema.findMany({
    where: isNull(fileSchema.folderId),
  });
  return getPublicFiles;
}
