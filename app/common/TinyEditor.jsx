"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] border rounded-lg bg-gray-50 animate-pulse flex items-center justify-center">
        <span className="text-gray-400">Loading editor...</span>
      </div>
    ),
  }
);

const TinyEditor = ({ handleEditorChange, formData }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[300px] border rounded-lg bg-gray-50 animate-pulse flex items-center justify-center">
        <span className="text-gray-400">Loading editor...</span>
      </div>
    );
  }

  return (
    <Editor
      apiKey="o8yy749r2wwznu6aukmspfe0qotb0hv8irb1sfc8to4fdwfb"
      init={{
        height: 400,
        menubar: true,
        plugins: [
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "image",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
          "code",
        ],
        toolbar:
          "undo redo | blocks | bold italic underline strikethrough | align lineheight | checklist numlist bullist indent outdent | link image media table | codesample code | removeformat",
        toolbar_mode: "sliding",
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image",
        file_picker_callback: (cb, value, meta) => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.onchange = () => {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
              const id = "blobid" + new Date().getTime();
              const blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
              const base64 = reader.result.split(",")[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };
          input.click();
        },
      }}
      onEditorChange={handleEditorChange}
      value={formData?.content || ""}
    />
  );
};

export default TinyEditor;