// service/tag.service.js
import { httpAxios } from "../config/httpAxios";
import { createCrudService } from "./base.service";

// Tags use standard REST API (no custom update needed)
export const tagService = createCrudService("/tags");

export const getTags = (page) => tagService.getAll(page);
export const addTag = (data) => tagService.create(data);
export const editTag = (id, data) => tagService.update(id, data);
export const deleteTag = (id) => tagService.delete(id);

// Optional: Get tag by ID if needed
export const getTagById = async (id) => {
  try {
    const response = await httpAxios.get(`/tags/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tag by ID:", error);
    throw error;
  }
};