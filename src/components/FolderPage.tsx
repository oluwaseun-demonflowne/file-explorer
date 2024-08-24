import { fetchFolderFile } from "@/actions/FetchFileInFolder";
import { fetchFolder } from "@/actions/FetchFolder";
import { headers } from "next/headers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiFileOn } from "react-icons/ci";
import { FaFolder } from "react-icons/fa";

type Props = {};

const FolderPage = async (props: Props) => {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";

  const currentPath = new URL(fullUrl).pathname;

  const currentPathSegments = currentPath.split("/").filter(Boolean);
  const lastSegment = currentPathSegments.at(-1);

  let getSubFolder = await fetchFolder(fullUrl.split("/").at(-1)!);
  let getSubFile = await fetchFolderFile(fullUrl.split("/").at(-1)!);
  return (
    <div className="flex">
      {Array.isArray(getSubFolder) &&
        getSubFolder.map((i, index: number) => (
          <div
            key={i.id}
            className="flex text-7xl text-[#68CAF9] flex-col items-center"
          >
            <Link
              href={`/${[...currentPathSegments, i.name].join("/")}`}
            >
              <FaFolder />
            </Link>
            <p className="text-sm text-black font-medium">{i.name}</p>
          </div>
        ))}
      {Array.isArray(getSubFile) &&
        getSubFile.map((i, index: number) => (
          <div
            key={i.id}
            className="flex text-7xl text-[#68CAF9] flex-col items-center"
          >
            <CiFileOn />
            <p className="text-sm text-black font-medium">{i.name}</p>
          </div>
        ))}
    </div>
  );
};

export default FolderPage;
