// hooks/useArticles.js
import { useCallback } from "react";
import { useGenericCrud } from "./useGenericCrud";
import { useToast } from "../context/ToastContext";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  fetchArticleById,
  updateArticleStatus,
  createArticleWithAI,
} from "../service/article.service";

// Transform API response to match generic CRUD expected format
const transformResponse = (response) => {
  if (!response || !response.data) {
    return { items: [], totalPages: 1, currentPage: 1 };
  }

  return {
    items: response.data.articles || [],
    totalPages: response.data.totalPages || 1,
    currentPage: response.data.page || 1,
    total: response.data.total || 0,
  };
};

export const useArticles = (page = 1) => {
  const { showToast, dismissToast } = useToast();

  // Fetch function with transformation
  const fetchFn = useCallback(async (p) => {
    const response = await fetchArticles(p);
    return transformResponse(response);
  }, []);

  // Standard CRUD functions
  const addFn = useCallback((data) => createArticle(data), []);
  const updateFn = useCallback((id, data) => updateArticle(id, data), []);
  const deleteFn = useCallback((id) => deleteArticle(id), []);

  // Use generic CRUD for standard operations
  const genericCrud = useGenericCrud({
    fetchFn,
    addFn,
    updateFn,
    deleteFn,
    initialPage: page,
    itemName: "Article",
  });

  // Extra feature: Get article by ID
  const getArticleById = useCallback(async (id) => {
    try {
      const response = await fetchArticleById(id);
      return response;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  }, []);

  // Extra feature: Update article status
  const updateStatus = useCallback(async (article_id, status) => {
    const toastId = showToast("loading", "Updating article status...");
    try {
      const response = await updateArticleStatus(article_id, status);
      if (response?.success !== false) {
        showToast("success", response?.message || "Status updated successfully");
        await genericCrud.refetch();
        return response;
      }
      throw new Error(response?.message || "Failed to update status");
    } catch (error) {
      showToast("error", error.message);
      throw error;
    } finally {
      dismissToast(toastId);
    }
  }, [genericCrud, showToast, dismissToast]);

  // Extra feature: Create article with AI
  const generateWithAI = useCallback(async (articleData) => {
    const toastId = showToast("loading", "Generating article with AI...");
    try {
      const response = await createArticleWithAI(articleData);
      if (response?.success !== false) {
        showToast("success", response?.message || "Article generated successfully");
        await genericCrud.refetch();
        return response;
      }
      throw new Error(response?.message || "Failed to generate article");
    } catch (error) {
      showToast("error", error.message);
      throw error;
    } finally {
      dismissToast(toastId);
    }
  }, [genericCrud, showToast, dismissToast]);

  return {
    // Standard CRUD from generic
    data: genericCrud.data,
    loading: genericCrud.loading,
    error: genericCrud.error,
    currentPage: genericCrud.currentPage,
    setCurrentPage: genericCrud.setCurrentPage,
    addItem: genericCrud.addItem,
    updateItem: genericCrud.updateItem,
    deleteItem: genericCrud.deleteItem,
    refetch: genericCrud.refetch,

    // Extra features for articles
    getArticleById,
    updateStatus,
    generateWithAI,
  };
};