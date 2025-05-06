import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import { getTags, addTag, deleteTag, editTag } from "../service/tags.service";

export const useTags = (page = 1) => {
  const [data, setData] = useState({ tags: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast, dismissToast } = useToast();

  const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await getTags(page);
      if (response && response.data) {
        setData(response.data);
      } else {
        setError("Failed to fetch tags");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteNewsTag = async (id) => {
    const toastId = showToast("loading", "Deleting tag...");
    const previousTags = [...data.tags];
    setData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag._id !== id),
    }));

    try {
      const response = await deleteTag(id);
      if (!response?.success) {
        setData({ ...data, tags: previousTags });
        setError("Failed to delete tag");
      }
      showToast("success", response.message || "Tag deleted successfully");
    } catch (err) {
      setData({ ...data, tags: previousTags });
      setError(err.message || "Something went wrong");
    } finally {
      dismissToast(toastId);
    }
  };

  const addNewsTag = async (newTag) => {
    const toastId = showToast("loading", "Adding tag...");
    try {
      const response = await addTag(newTag);
      if (!response?.tag) {
        setData((prev) => ({
          ...prev,
          tags: prev.tags.filter((tag) => tag !== newTag),
        }));
        setError("Failed to add tag");
      }
      showToast("success", response.message || "Tag added successfully");
      fetchTags(); // Refetch tags after adding
    } catch (err) {
      setData((prev) => ({
        ...prev,
        tags: prev.tags.filter((tag) => tag !== newTag),
      }));
      setError(err.message || "Something went wrong");
    } finally {
      dismissToast(toastId);
    }
  };

  const updateNewsTag = async (id, updatedTag) => {
    const previousTags = [...data.tags];
    const toastId = showToast("loading", "Updating tag...");
    try {
      const response = await editTag(id, updatedTag);
      if (response.data?.tags) {
        setData((prev) => ({
          ...prev,
          tags: previousTags.map((tag) =>
            tag._id === id ? response.data.tags : tag
          ),
        }));
        setError("Failed to update tag");
      }
      showToast("success", response.message || "Tag updated successfully");
    } catch (err) {
      setData((prev) => ({
        ...prev,
        tags: previousTags,
      }));
      setError(err.message || "Something went wrong");
    } finally {
      dismissToast(toastId);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [page]);

  return {
    data,
    loading,
    error,
    deleteNewsTag,
    addNewsTag,
    updateNewsTag,
    refetch: fetchTags,
  };
};
