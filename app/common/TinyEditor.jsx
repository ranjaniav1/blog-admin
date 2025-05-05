'use client'

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the TinyMCE Editor
const Editor = dynamic(() => import("@tinymce/tinymce-react").then(mod => mod.Editor), {
  ssr: false, // Disable SSR for this component
  loading: () => <p>Loading editor...</p>, // Optional loading indicator
});

const TinyEditor = ({ handleEditorChange, formData }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the editor only renders on the client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return null until the component is mounted client-side
    return null;
  }

  return (
    <Editor
      apiKey="cuo0heb4h29r9ana3m1nklyrbh63qkvmsbmd7a6hg2asg7eq"
      init={{
        height: 300,
        menubar: false,
        plugins: [
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
        ],
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: "embedded",
      }}
      onEditorChange={handleEditorChange}
      value={formData?.content}
    />
  );
};

export default TinyEditor;
