// service/subcategory.service.js
import { httpAxios } from "../config/httpAxios";
import { createCrudService } from "./base.service";

// Create base service for subcategories (no custom update needed for getAll/create/delete)
const baseSubcategoryService = createCrudService("/subcategories");

// Use base service for standard operations
export const getSubcategories = (page) => baseSubcategoryService.getAll(page);
export const addSubcategory = (data) => baseSubcategoryService.create(data);
export const deleteSubcategory = (id) => baseSubcategoryService.delete(id);

// Override update because subcategory has special API format
export const editSubcategory = async (id, subcategory) => {
  try {
    const response = await httpAxios.put(`/subcategories`, {
      subcategory_id: id,
      name: subcategory.name,
      description: subcategory.description,
      slug: subcategory.slug,
      category_id: subcategory.category_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing subcategory:", error);
    throw error;
  }
};