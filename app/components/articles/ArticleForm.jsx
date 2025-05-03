"use client";

import React, { useState } from "react";
import TinyEditor from "@/app/common/TinyEditor";
import Button from "@/app/common/Button";
import { useCategories } from "@/app/hooks/useCategories";
import { useSubcategories } from "@/app/hooks/useSubCategories";
import { useTags } from "@/app/hooks/useTags";
import { useCreateArticle } from "@/app/hooks/useArticles"; // Import the custom hook

const ArticleForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    subCategory: "",
    tags: [],
    image: null,
    video: null,
  });

  const { data: categories } = useCategories();
  const { subcategories } = useSubcategories(true, 1);
  const { data: tags } = useTags();

  const { loading, error, success, addArticle } = useCreateArticle(); // Using the custom hook

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleFileChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleCategoryChange = (id) => {
    setFormData({ ...formData, category: id });
  };

  const handleSubCategoryChange = (id) => {
    setFormData({ ...formData, subCategory: id });
  };

  const handleTagChange = (e) => {
    const selectedTags = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, tags: selectedTags });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if image is selected before submitting
    if (!formData.image) {
      alert("Image is required.");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("slug", formData.slug);
    form.append("content", formData.content);
    form.append("category_id", formData.category);
    form.append("subCategory_id", formData.subCategory);
    form.append("tag_id", JSON.stringify(formData.tags));

    form.append("image", formData.image); // Append the image file

    // Optionally append video if provided
    if (formData.video) {
      form.append("video", formData.video);
    }

    // Now call the addArticle function with the FormData
    addArticle(form); // Use FormData instead of JSON
    setFormData({
      title: "",
      slug: "",
      content: "",
      category: "",
      subCategory: "",
      tags: [],
      image: null,
      video: null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="primary p-6 max-w-full shadow-md rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 col-span-full">
        Create Article
      </h2>

      {/* Title */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => handleChange(e, "title")}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Slug */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={(e) => handleChange(e, "slug")}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Content (TinyMCE Editor) */}
      <div className="flex flex-col col-span-full">
        <label className="mb-1 font-semibold text-gray-700">Content</label>
        <TinyEditor
          formData={formData}
          handleEditorChange={handleEditorChange}
        />
      </div>

      {/* Category Dropdown */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Category</option>
          {categories?.categories?.map((category) => (
            <option key={category?._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sub-category Dropdown */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Sub Category</label>
        <select
          name="subCategory"
          value={formData.subCategory}
          onChange={(e) => handleSubCategoryChange(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Sub Category</option>
          {subcategories?.subcategories?.map((subCategory) => (
            <option key={subCategory?._id} value={subCategory._id}>
              {subCategory.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags Dropdown with checkboxes */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Tags</label>
        <select
          multiple
          value={formData.tags}
          onChange={handleTagChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          {tags?.tags?.map((tag) => (
            <option key={tag?._id} value={tag._id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      {/* Image File Input */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "image")}
          className="border-dashed border-2 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Video File Input */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => handleFileChange(e, "video")}
          className="border-dashed border-2 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6 col-span-full flex justify-end">
        <Button
          type="submit"
          variant="success"
          bgColorRequired
          className="text-white px-6 py-2 rounded transition"
        >
          {loading ? "Submitting..." : "Submit Article"}
        </Button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Success Message */}
      {success && (
        <p className="text-green-500 mt-4">Article created successfully!</p>
      )}
    </form>
  );
};

export default ArticleForm;
