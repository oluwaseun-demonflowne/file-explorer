"use server";
import { db } from "@/db/connect";
import { FolderSchema, folderSchema } from "@/db/schema/folder";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function createNewFolder(
  parentId: null | string | undefined,
  name: string,
  size = 10
) {
    const _cookies = cookies();
  try {
    if (parentId !== null && parentId !== undefined) {
      const findFolder = await db.query.folderSchema.findFirst({
        where: eq(folderSchema.name, parentId),
      });
      await db
        .insert(folderSchema)
        .values({ parentId: findFolder?.id, name, size });
      return 200;
    }
    await db.insert(folderSchema).values({ parentId, name, size });
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}
