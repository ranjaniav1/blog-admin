// service/article.service.js
import { httpAxios } from "../config/httpAxios";
import { createCrudService } from "./base.service";

// Create base service for articles
const baseArticleService = createCrudService("/articles");

// Use base service for delete
export const deleteArticle = (id) => baseArticleService.delete(id);

// GET all articles - override because API uses 'limit'
export const fetchArticles = async (page = 1, limit = 10) => {
  try {
    const response = await httpAxios.get(`/articles?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

// POST create article with FormData
export const createArticle = async (articleData) => {
  try {
    const response = await httpAxios.post("/articles", articleData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

// POST create article with AI
export const createArticleWithAI = async (articleData) => {
  try {
    const response = await httpAxios.post("/articles/generate-ai", articleData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating article with AI:", error);
    throw error;
  }
};

// PUT update article with FormData
export const updateArticle = async (articleData) => {
  try {
    const response = await httpAxios.put(`/articles`, articleData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

// GET article by ID
export const fetchArticleById = async (articleId) => {
  try {
    const response = await httpAxios.get(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    throw error;
  }
};

// PUT update article status
export const updateArticleStatus = async (article_id, status) => {
  try {
    const response = await httpAxios.put(`/articles/update-status`, {
      status,
      article_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating article status:", error);
    throw error;
  }
};