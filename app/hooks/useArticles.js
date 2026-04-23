import { useEffect, useState } from "react";
import {
  createArticle,
  fetchArticles,
  updateArticle,
  deleteArticle,
  fetchArticleById,
  updateArticleStatus,
  createArticleWithAI,
} from "../service/article.service";
import { useToast } from "../context/ToastContext";

export const useCreateArticle = (page = 1, id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
    articles: [],
    page: 1,
    totalPages: 1,
  });

  const { showToast, dismissToast } = useToast();

  const getArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchArticles(page);
      if (response?.data?.articles) {
        setData({
          articles: response.data.articles,
          page: response.data.page || 1,
          totalPages: response.data.totalPages || 1,
        });
        setSuccess(true);
      }
    } catch (err) {
      setError("An error occurred while fetching articles.");
    } finally {
      setLoading(false);
    }
  };

  const getArticleById = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchArticleById(id);
      if (response?.data) {
        setData({
          articles: response.data.article,
        });
        console.log("Fetched article data:", response.data);
        setSuccess(true);
      }
    } catch (err) {
      setError("An error occurred while fetching the article.");
    } finally {
      setLoading(false);
    }
  };

  const addArticle = async (formData) => {
    setLoading(true);
    setError(null);
    const toastId = showToast("loading", "Creating article...");
    try {
      const response = await createArticle(formData);
      if (response) {
        setSuccess(true);
        showToast(
          "success",
          response.message || "Article created successfully!"
        );
        await getArticles(); // Refresh after creation
      }
    } catch (err) {
      setError("Failed to create article.");
    } finally {
      setLoading(false);
      dismissToast(toastId);
    }
  };
  const addArticleWithAI = async (formData) => {
    setLoading(true);
    setError(null);
    const toastId = showToast("loading", "Generating article...");
    try {
      const response = await createArticleWithAI(formData);
      if (response) {
        setSuccess(true);
        showToast(
          "success",
          response.message || "Article created successfully!"
        );
        await getArticles(); // Refresh after creation
      }
    } catch (err) {
      setError("Failed to create article.");
    } finally {
      setLoading(false);
      dismissToast(toastId);
    }
  };

  const editArticle = async (updatedData) => {
    setLoading(true);
    setError(null);
    const toastId = showToast("loading", "Updating article...");
    try {
      const response = await updateArticle(updatedData);
      if (response) {
        setSuccess(true);
        showToast(
          "success",
          response.message || "Article updated successfully!"
        );
        await getArticles(); // Refresh after update
      }
    } catch (err) {
      setError("Failed to update article.");
    } finally {
      setLoading(false);
      dismissToast(toastId);
    }
  };

  const removeArticle = async (id) => {
    setLoading(true);
    setError(null);
    const toastId = showToast("loading", "Deleting article...");
    try {
      const response = await deleteArticle(id);
      if (response) {
        setSuccess(true);
        showToast(
          "success",
          response.message || "Article Removed successfully!"
        );
        await getArticles(); // Refresh after delete
      }
    } catch (err) {
      setError("Failed to delete article.");
    } finally {
      setLoading(false);
      dismissToast(toastId);
    }
  };

  // update article status
  const editArticleStatus = async (article_id, status) => {
    setLoading(true);
    setError(null);
    const toastId = showToast("loading", "Updating article status...");
    try {
      const response = await updateArticleStatus(article_id, status);
      if (response) {
        setSuccess(true);
        showToast(
          "success",
          response.message || "Article status updated successfully!"
        );
        await getArticles(); // Refresh after update
      }
    } catch (err) {
      setError("Failed to update article status.");
    } finally {
      setLoading(false);
      dismissToast(toastId);
    }
  };

  useEffect(() => {
    if (id) {
      console.log("Fetching article by ID:", id);
      getArticleById();
    } else {
      console.log("Fetching articles for page:", page);
      getArticles();
    }
  }, [page]);

  return {
    loading,
    error,
    success,
    data,
    addArticle,
    editArticle,
    removeArticle,
    getArticleById,
    editArticleStatus,
    setData,
    addArticleWithAI
  };
};
