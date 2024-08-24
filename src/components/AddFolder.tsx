"use client";
import { createNewFolder } from "@/actions/CreateNewFolder";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const AddFolder = (props: Props) => {
  const getPath = usePathname();
  const [folderName, setFolderName] = useState("");
  console.log(getPath.split("/").at(-1));
  const parentId =
    getPath.split("/").at(-1) === "" ? null : getPath.split("/").at(-1);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const getStatus = await createNewFolder(parentId, folderName);
        console.log(getStatus);
        setFolderName("");
      }}
    >
        <p>folder add</p>
      <input
        required
        onChange={(e) => setFolderName(e.currentTarget.value)}
        className="border"
      />
      <button>add</button>
    </form>
  );
};

export default AddFolder;
