"use server";
import { db } from "@/db/connect";
import { fileSchema, SelectFileModel } from "@/db/schema/file";
import {
  FolderSchema,
  folderSchema,
  SelectFolderModel,
} from "@/db/schema/folder";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function fetchFolderFile(
  name: string
): Promise<SelectFileModel[] | 500 | undefined> {
  const _cookies = cookies();
  try {
    const findFolder = await db.query.folderSchema.findFirst({
      where: eq(folderSchema.name, name),
    });
    if (findFolder) {
      const returnChildrenFolder = await db.query.fileSchema.findMany({
        where: eq(fileSchema.folderId, findFolder?.id),
      });
      return returnChildrenFolder;
    }
    return undefined;
  } catch (error) {
    console.log(error);
    return 500;
  }
}
