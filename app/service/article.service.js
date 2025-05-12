import { httpAxios } from "../config/httpAxios";

export async function fetchArticles(page = 1, limit = 10) {
  try {
    const response = await httpAxios.get(
      `/articles?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return;
  }
}

export async function createArticle(articleData) {
  try {
    const response = await httpAxios.post("/articles", articleData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating article:", error);
    return;
  }
}

export async function updateArticle(articleData) {
  try {
    const response = await httpAxios.put(`/articles`, articleData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
    return;
  }
}

export async function deleteArticle(articleId) {
  try {
    const response = await httpAxios.delete(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting article:", error);
    return;
  }
}

export async function fetchArticleById(articleId) {
  try {
    const response = await httpAxios.get(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    return;
  }
}

export async function updateArticleStatus(article_id, status) {
  try {
    const response = await httpAxios.put(`/articles/update-status`, {
      status,
      article_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating article status:", error);
    return;
  }
}
