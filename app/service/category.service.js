import { httpAxios } from "../config/httpAxios";
import { createCrudService } from "./base.service";

// Create base service with custom update for category
export const categoryService = createCrudService("/categories", {
  customUpdate: async (id, category) => {
    const response = await httpAxios.put(`/categories`, {
      category_id: id,
      name: category.name,
      description: category.description,
      slug: category.slug,
    });
    return response.data;
  }
});

export const getCategories = (page) => categoryService.getAll(page);
export const addCategory = (data) => categoryService.create(data);
export const editCategory = (id, data) => categoryService.update(id, data);
export const deleteCategory = (id) => categoryService.delete(id);