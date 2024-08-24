import { getPublicFilesFile } from "@/actions/GetHomeFiles";
import { getPublicFiles } from "@/actions/GetHomeFolders";
import Link from "next/link";
import React from "react";
import { CiFileOn } from "react-icons/ci";
import { FaFile, FaFolder } from "react-icons/fa";

type Props = {};

const HomePage = async (props: Props) => {
  return (
    <div className="text-7xl flex gap-7 text-[#68CAF9]">
      {await (
        await getPublicFiles()
      ).map((i) => (
        <div key={i.id} className="flex flex-col items-center">
          <Link href={`/folder/${i.name}`}>
            <FaFolder />
          </Link>
          <p className="text-sm text-black font-medium">{i.name}</p>
        </div>
      ))}
      {await (
        await getPublicFilesFile()
      ).map((i) => (
        <div key={i.id} className="flex flex-col items-center">
          {/* <Link href={`/folder/${i.name}`}> */}
            <CiFileOn />
          {/* </Link> */}
          <p className="text-sm text-black font-medium">{i.name}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
