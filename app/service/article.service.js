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
