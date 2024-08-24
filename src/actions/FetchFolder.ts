"use server";
import { db } from "@/db/connect";
import {
  FolderSchema,
  folderSchema,
  SelectFolderModel,
} from "@/db/schema/folder";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function fetchFolder(
  name: string
): Promise<SelectFolderModel[] | 500 | undefined> {
  const _cookies = cookies();
  try {
    const findFolder = await db.query.folderSchema.findFirst({
      where: eq(folderSchema.name, name),
    });

    if (findFolder) {
      const returnChildrenFolder = await db.query.folderSchema.findMany({
        where: eq(folderSchema.parentId, findFolder?.id),
      });
      console.log(returnChildrenFolder)
      return returnChildrenFolder;
    }
    return undefined;
  } catch (error) {
    console.log(error);
    return 500;
  }
}
