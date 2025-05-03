import { useEffect, useState } from "react";
import { createArticle, fetchArticles } from "../service/article.service";

export const useCreateArticle = (page) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);

  const addArticle = async (formData) => {
    // Accept FormData here
    setLoading(true);
    setError(null);
    try {
      const response = await createArticle(formData); // Send FormData directly
      if (response) {
        setSuccess(true);
      }
    } catch (err) {
      setError("An error occurred while creating the article.");
    } finally {
      setLoading(false);
    }
  };

  const getArticle = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchArticles(); // Assuming you have a function to fetch articles
      if (response) {
        setSuccess(true);
        setData(response.data); // Assuming response.data contains the articles
      }
    } catch (err) {
      setError("An error occurred while fetching the articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticle();
  }, [page]);

  return {
    loading,
    error,
    success,
    data,
    addArticle,
  };
};
