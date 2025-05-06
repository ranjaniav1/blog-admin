import { useEffect, useState } from "react";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "../service/category.service";
import { useToast } from "../context/ToastContext";

export const useCategories = (page = 1) => {
  const [data, setData] = useState({ categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast, dismissToast } = useToast();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategories(page);
      if (response && response.data) {
        setData(response.data);
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteNewsCategory = async (id) => {
    const toastId = showToast("loading", "Deleting category...");
    const previousCategories = [...data.categories];
    setData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat._id !== id),
    }));

    try {
      const response = await deleteCategory(id);
      if (!response?.success) {
        setData({ ...data, categories: previousCategories });
        setError("Failed to delete category");
      }
      showToast("success", response.message || "Category deleted successfully");
    } catch (err) {
      setData({ ...data, categories: previousCategories });
      setError(err.message || "Something went wrong");
    }finally {
      dismissToast(toastId);
    }
  };

  const addNewsCategory = async (newCategory) => {
    const toastId = showToast("loading", "Adding category...");
    try {
      const response = await addCategory(newCategory);
      if (!response?.category) {
        setData((prev) => ({
          ...prev,
          categories: prev.categories.filter((cat) => cat !== newCategory),
        }));
        setError("Failed to add category");
      }
      showToast("success", response.message || "Category added successfully");
      fetchCategories(); // Refetch categories after adding
    } catch (err) {
      setData((prev) => ({
        ...prev,
        categories: prev.categories.filter((cat) => cat !== newCategory),
      }));
      setError(err.message || "Something went wrong");
    } finally {
      dismissToast(toastId);
    }
  };

  const updateNewsCategory = async (id, updatedCategory) => {
    const previousCategories = [...data.categories];
    const toastId = showToast("loading", "Updating category...");
    try {
      const response = await editCategory(id, updatedCategory);
      if (response.data?.categories) {
        setData((prev) => ({
          ...prev,
          categories: previousCategories.map((c) =>
            c._id === id ? response.data.categories : c
          ),
        }));
        setError("Failed to update category");
      }
      showToast("success", response.message || "Category updated successfully");
    } catch (err) {
      setData((prev) => ({
        ...prev,
        categories: previousCategories,
      }));
      setError(err.message || "Something went wrong");
    }
    finally {
      dismissToast(toastId);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page]);

  return {
    data,
    loading,
    error,
    deleteNewsCategory,
    addNewsCategory,
    updateNewsCategory,
    refetch: fetchCategories,
  };
};
