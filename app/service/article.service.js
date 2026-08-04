// service/article.service.js
import { httpAxios } from "../config/httpAxios";
import { createCrudService } from "./base.service";

// Create base service for articles
export const articleService = createCrudService("/articles", {
  customUpdate: async (id, article) => {
    const formData = new FormData()
    formData.append("article_id", id);

    formData.append("title", article.title);
    formData.append("slug", article.slug);
    formData.append("content", article.content);
    formData.append("excerpt", article.excerpt || "");
    formData.append("category", article.category);
    formData.append("status", article.status);
    if (article.tags) {
      formData.append(
        "tags",
        JSON.stringify(article.tags)
      );
    }

    if (article.image) {
      formData.append("image", article.image);
    }

    const response = await httpAxios.put("/articles", formData, {
      headers: { "Content-type": "multipart/form-data" }
    })
    return response.data
  }
})
// Use base service for delete

export const fetchArticles = async (page = 1, limit = 10) => {
  const response = await httpAxios.get(`/articles?page=${page}&limit=${limit}`);
  return response.data;
};

export const createArticle = (data) => articleService.create(data)

export const createArticleWithAI = async (data) => {
  const response = await httpAxios.post(
    "/articles/generate-ai",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
};

export const updateArticle = async (id, data) => articleService.update(id, data)
export const deleteArticle = async (id) => articleService.delete(id)

export const fetchArticleById = async (id) => {
  const response = await httpAxios.get(`/articles/${id}`);
  return response.data;
};



export const updateArticleStatus = async (article_id, status) => {
  const response = await httpAxios.put(
    "/articles/update-status",
    {
      article_id,
      status
    }
  );

  return response.data;
};