// hooks/useGenericCrud.js
"use client";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "../context/ToastContext";

export const useGenericCrud = ({
  fetchFn,
  addFn,
  updateFn,
  deleteFn,
  initialPage = 1,
  itemName = "item",
}) => {
  const [data, setData] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { showToast, dismissToast } = useToast();

  const fetchData = useCallback(async (page = currentPage) => {
    setLoading(true);
    try {
      const response = await fetchFn(page);
      if (response && response.data) {
        setData(response.data);
      } else if (Array.isArray(response)) {
        setData({ items: response });
      } else {
        setData(response || { items: [] });
      }
      setError(null);
    } catch (err) {
      setError(err.message || `Failed to fetch ${itemName}s`);
      showToast("error", err.message || `Failed to fetch ${itemName}s`);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, itemName, showToast]);

  // const addItem = async (newItem) => {
  //   const toastId = showToast("loading", `Adding ${itemName}...`);
  //   try {
  //     const response = await addFn(newItem);
  //     if (response?.success !== false) {
  //       showToast("success", response?.message || `${itemName} added successfully`);
  //       await fetchData(currentPage);
  //       return response;
  //     }
  //     throw new Error(response?.message || `Failed to add ${itemName}`);
  //   } catch (err) {
  //     showToast("error", err.message);
  //     throw err;
  //   } finally {
  //     dismissToast(toastId);
  //   }
  // };
  // hooks/useGenericCrud.js - Add console logs to debug
  const addItem = async (newItem) => {
    console.log("addItem called with:", newItem); // Debug log
    const toastId = showToast("loading", `Adding ${itemName}...`);
    try {
      const response = await addFn(newItem);
      console.log("addItem response:", response); // Debug log
      if (response?.success !== false) {
        showToast("success", response?.message || `${itemName} added successfully`);
        await fetchData(currentPage);
        return response;
      }
      throw new Error(response?.message || `Failed to add ${itemName}`);
    } catch (err) {
      console.error("addItem error:", err); // Debug log
      showToast("error", err.message);
      throw err;
    } finally {
      dismissToast(toastId);
    }
  };

  const updateItem = async (id, updatedItem) => {
    const toastId = showToast("loading", `Updating ${itemName}...`);
    try {
      const response = await updateFn(id, updatedItem);
      if (response?.success !== false) {
        showToast("success", response?.message || `${itemName} updated successfully`);
        await fetchData(currentPage);
        return response;
      }
      throw new Error(response?.message || `Failed to update ${itemName}`);
    } catch (err) {
      showToast("error", err.message);
      throw err;
    } finally {
      dismissToast(toastId);
    }
  };

  const deleteItem = async (id, name = "") => {
    const toastId = showToast("loading", `Deleting ${name || itemName}...`);
    // Optimistic update
    const previousData = { ...data };
    setData((prev) => ({
      ...prev,
      items: prev.items?.filter((item) => item._id !== id) || [],
    }));

    try {
      const response = await deleteFn(id);
      if (response?.success !== false) {
        showToast("success", response?.message || `${itemName} deleted successfully`);
        await fetchData(currentPage);
        return response;
      }
      // If failed, restore previous data
      setData(previousData);
      throw new Error(response?.message || `Failed to delete ${itemName}`);
    } catch (err) {
      setData(previousData);
      showToast("error", err.message);
      throw err;
    } finally {
      dismissToast(toastId);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  return {
    data,
    loading,
    error,
    currentPage,
    setCurrentPage,
    addItem,
    updateItem,
    deleteItem,
    refetch: () => fetchData(currentPage),
  };
};