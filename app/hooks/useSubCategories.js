import { useEffect, useState } from "react";
import {
  getSubcategories,
  getSubcategoriesByCatSlug,
  addSubcategory,
  deleteSubcategory,
  editSubcategory,
} from "../service/subcategory.service";

export const useSubcategories = (requiredAllCategory, page) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubcategories = async (page) => {
    setLoading(true);
    try {
      const response = await getSubcategories(page);
      console.log("Subcategories Response:", response);
      if (response && response.data) {
        setSubcategories(response.data);
      } else {
        setError("Failed to fetch subcategories");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategoriesByCategory = async (slug) => {
    setLoading(true);
    try {
      const response = await getSubcategoriesByCatSlug(slug);
      if (response && response.data) {
        setSubcategories(response.data);
      } else {
        setError("Failed to fetch subcategories");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteNewsSubcategory = async (id) => {
    const previous = [...subcategories.subcategories];
    setSubcategories((prev) => ({
      ...prev,
      subcategories: prev.subcategories.filter((sub) => sub._id !== id),
    }));

    try {
      const res = await deleteSubcategory(id);
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

  const addNewsSubcategory = async (newSub) => {
    setSubcategories((prev) => [...prev.subcategories, newSub]);
    try {
      const res = await addSubcategory(newSub);
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
    const previous = [...subcategories.subcategories];
    try {
      const res = await editSubcategory(id, updatedSub);
      const updated = res?.data?.subcategories; // this is the updated single object
      if (updated) {
        setSubcategories((prev) => ({
          ...prev,
          subcategories: previous.map((s) => (s._id === id ? updated : s)),
        }));
      } else {
        setSubcategories(previous);
        setError("Failed to update subcategory");
      }
    } catch (err) {
      setSubcategories(previous);
      setError(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (requiredAllCategory) {
      fetchSubcategories(page);
    }
  }, [requiredAllCategory, page]);

  return {
    subcategories,
    loading,
    error,
    deleteNewsSubcategory,
    addNewsSubcategory,
    updateSubcategory,
    refetch: fetchSubcategories,
    fetchSubcategoriesByCategory,
  };
};
