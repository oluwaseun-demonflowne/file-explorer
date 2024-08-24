"use server";
import { db } from "@/db/connect";
import { fileSchema, folderSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function createNewFile(
  folderName: null | string | undefined,
  name: string,
  size = 10,
  extension = "jpg",
  linkUrl = ""
) {
  const _cookies = cookies();
  try {
    if (folderName !== null && folderName !== undefined) {
      const findFolder = await db.query.folderSchema.findFirst({
        where: eq(folderSchema.name, folderName),
      });
      await db
        .insert(fileSchema)
        .values({ folderId: findFolder?.id, name, size, extension, linkUrl });
      return 200;
    }
    await db
      .insert(fileSchema)
      .values({ folderId: folderName, name, size, extension, linkUrl });
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}
