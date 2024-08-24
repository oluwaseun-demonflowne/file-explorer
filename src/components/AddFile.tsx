"use client";
import { createNewFile } from "@/actions/CreateNewFile";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const AddFile = (props: Props) => {
  const getPath = usePathname();
  const [fileName, setFileName] = useState("");
  console.log(getPath.split("/").at(-1));
  const parentId =
    getPath.split("/").at(-1) === "" ? null : getPath.split("/").at(-1);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const getStatus = await createNewFile(parentId, fileName);
        console.log(getStatus);
        setFileName("");
      }}
    >
      <p>file add</p>
      <input
        required
        onChange={(e) => setFileName(e.currentTarget.value)}
        className="border"
      />
      <button>add</button>
    </form>
  );
};

export default AddFile;
