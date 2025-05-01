import { useEffect, useState } from "react";
import {
  getNewsSubcategories,
  deleteNewsSubcategory,
  addNewsSubcategory,
  editNewsSubcategory,
  getNewsSubcategoriesById,
} from "../utils/subcategory.util";

export const useSubcategories = (requiredAllCategory) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubcategories = async () => {
    setLoading(true);
    try {
      const response = await getNewsSubcategories();
      if (response && response.data.subcategories) {
        setSubcategories(response.data.subcategories);
      } else {
        setError("Failed to fetch subcategories");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategoriesByCategory = async (id) => {
    setLoading(true);
    try {
      const response = await getNewsSubcategoriesById(id);
      if (response && response.data.subcategories) {
        setSubcategories(response.data.subcategories);
      } else {
        setError("Failed to fetch subcategories");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteSubcategory = async (id) => {
    const previous = [...subcategories];
    setSubcategories((prev) => prev.filter((sub) => sub._id !== id));
    try {
      const res = await deleteNewsSubcategory(id);
      if (!res?.success) {
        setSubcategories(previous);
        setError("Failed to delete subcategory");
      }
      fetchSubcategories();
    } catch (err) {
      setSubcategories(previous);
      setError(err.message || "Something went wrong");
    }
  };

  const addSubcategory = async (newSub) => {
    setSubcategories((prev) => [...prev, newSub]);
    try {
      const res = await addNewsSubcategory(newSub);
      if (!res?.sub_category) {
        setSubcategories((prev) => prev.filter((s) => s !== newSub));
        setError("Failed to add subcategory");
      }
      fetchSubcategories();
    } catch (err) {
      setSubcategories((prev) => prev.filter((s) => s !== newSub));
      setError(err.message || "Something went wrong");
    }
  };

  const updateSubcategory = async (id, updatedSub) => {
    const previous = [...subcategories];
    setSubcategories((prev) =>
      prev.map((s) => (s._id === id ? { ...s, ...updatedSub } : s))
    );
    try {
      const res = await editNewsSubcategory(id, updatedSub);
      if (!res?.sub_category) {
        setSubcategories(previous);
        setError("Failed to update subcategory");
      }
      fetchSubcategories();
    } catch (err) {
      setSubcategories(previous);
      setError(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (requiredAllCategory) {
      fetchSubcategories();
    }
  }, [requiredAllCategory]);

  return {
    subcategories,
    loading,
    error,
    deleteSubcategory,
    addSubcategory,
    updateSubcategory,
    refetch: fetchSubcategories,
    fetchSubcategoriesByCategory,
  };
};
