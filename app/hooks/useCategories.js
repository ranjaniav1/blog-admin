import { useEffect, useState } from "react";
import {
  getNewsCategories,
  deleteNewsCategory,
  addNewsCategory,
  editNewsCategory,
} from "../utils/category.util";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getNewsCategories();
      console.log("Fetched categories:", response);
      if (response && response.data.categories) {
        setCategories(response.data.categories);
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    // Optimistic delete
    const previousCategories = [...categories];
    setCategories((prev) => prev.filter((cat) => cat.id !== id));

    try {
      const response = await deleteNewsCategory(id);
      if (!response?.success) {
        // If delete fails, revert the optimistic change
        setCategories(previousCategories);
        setError("Failed to delete category");
      }
      fetchCategories(); // Refetch categories after deletion
    } catch (err) {
      // If error occurs, revert the optimistic change
      setCategories(previousCategories);
      setError(err.message || "Something went wrong");
    }
  };

  const addCategory = async (newCategory) => {
    // Optimistic add
    setCategories((prev) => [...prev, newCategory]);

    try {
      const response = await addNewsCategory(newCategory);
      if (!response?.category) {
        // If add fails, revert the optimistic change
        setCategories((prev) => prev.filter((cat) => cat !== newCategory));
        setError("Failed to add category");
      }
      fetchCategories();
    } catch (err) {
      // If error occurs, revert the optimistic change
      setCategories((prev) => prev.filter((cat) => cat !== newCategory));
      setError(err.message || "Something went wrong");
    }
  };

  const updateCategory = async (id, updatedCategory) => {
    // Optimistic update
    const previousCategories = [...categories];
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updatedCategory } : cat))
    );

    try {
      const response = await editNewsCategory(id, updatedCategory);
      if (!response?.category) {
        // If update fails, revert the optimistic change
        setCategories(previousCategories);
        setError("Failed to update category");
      }
      fetchCategories();
    } catch (err) {
      // If error occurs, revert the optimistic change
      setCategories(previousCategories);
      setError(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    deleteCategory,
    addCategory,
    updateCategory,
    refetch: fetchCategories,
  };
};
