import React from "react";
import File from "../File/File";

export default function FileList({ files, onDelete, onRename }) {
  return (
    <>
      {files.map((file, index) => {
        return (
          <File
            key={index}
            id={file.file_id}
            name={file.name}
            size={file.size}
            author={file.author.email}
            access={file.access}
            onDelete={onDelete}
            onRename={onRename}
            custom={index / 1.2}
          />
        );
      })}
    </>
  );
}
