"use client";

import React, { useState } from "react";
import ArticleForm from "@/app/components/articles/ArticleForm";

const Page = () => {
  const defaultExpiryDate = new Date();
  defaultExpiryDate.setFullYear(defaultExpiryDate.getFullYear() + 1);
  const formattedDate = defaultExpiryDate.toISOString().split("T")[0];

  const [mode, setMode] = useState("manual");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    subcategory: "",
    tag_id: [],
    image: null,
    video: null,
    expiry_date: formattedDate,
    published_at: formattedDate,
  });

  const [aiForm, setAiForm] = useState({
    title: "",
    category: "",
    subcategory: "",
    tag_id: [],
  });

  return (
    <div className="flex flex-col gap-4 p-4">

      {/* MODE SWITCH */}
      <div className="flex gap-3">
        <button
          onClick={() => setMode("manual")}
          className={`px-4 py-2 rounded ${
            mode === "manual" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          ✍️ Manual
        </button>

        <button
          onClick={() => setMode("ai")}
          className={`px-4 py-2 rounded ${
            mode === "ai" ? "bg-purple-600 text-white" : "bg-gray-200"
          }`}
        >
          ✨ Generate with AI
        </button>
      </div>

      {/* FORM */}
      <ArticleForm
        formData={formData}
        setFormData={setFormData}
        aiForm={aiForm}
        setAiForm={setAiForm}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
};

export default Page;