import { useEffect, useState } from "react";
import {
  getSubcategories,
  getSubcategoriesByCatSlug,
  addSubcategory,
  deleteSubcategory,
  editSubcategory,
} from "../service/subcategory.service";
import { useToast } from "../context/ToastContext";

export const useSubcategories = (requiredAllCategory, page) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast, dismissToast } = useToast();

  const fetchSubcategories = async (page) => {
    setLoading(true);
    // const toastId = showToast("loading", "Loading subcategories...");
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
      // dismissToast(toastId);
    }
  };

  const fetchSubcategoriesByCategory = async (slug) => {
    setLoading(true);
    // const toastId = showToast(
    //   "loading",
    //   "Loading subcategories by category..."
    // );
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
      // dismissToast(toastId);
    }
  };

  const deleteNewsSubcategory = async (id) => {
    const toastId = showToast("loading", "Deleting subcategory...");
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
      showToast("success", res.message || "Subcategory deleted successfully");
      fetchSubcategories();
    } catch (err) {
      setSubcategories(previous);
      setError(err.message || "Something went wrong");
    } finally {
      dismissToast(toastId);
    }
  };

  const addNewsSubcategory = async (newSub) => {
    const toastId = showToast("loading", "Adding subcategory...");
    setSubcategories((prev) => [...prev.subcategories, newSub]);
    try {
      const res = await addSubcategory(newSub);
      if (!res?.sub_category) {
        setSubcategories((prev) => prev.filter((s) => s !== newSub));
        setError("Failed to add subcategory");
      }
      showToast("success", res.message || "Subcategory added successfully");
      fetchSubcategories();
    } catch (err) {
      setSubcategories((prev) => prev.filter((s) => s !== newSub));
      setError(err.message || "Something went wrong");
    } finally {
      dismissToast(toastId);
    }
  };

  const updateSubcategory = async (id, updatedSub) => {
    const previous = [...subcategories.subcategories];
    const toastId = showToast("loading", "Updating subcategory...");
    try {
      const res = await editSubcategory(id, updatedSub);
      const updated = res?.data?.subcategories; // this is the updated single object
      if (updated) {
        setSubcategories((prev) => ({
          ...prev,
          subcategories: previous.map((s) => (s._id === id ? updated : s)),
        }));
        showToast("success", res.message || "Subcategory updated successfully");
      } else {
        setSubcategories(previous);
        setError("Failed to update subcategory");
      }
    } catch (err) {
      setSubcategories(previous);
      setError(err.message || "Something went wrong");
    } finally {
      dismissToast(toastId);
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
