// utils/category.util.js
import {
  getCategories,
  deleteCategory,
  addCategory,
  editCategory,
} from "../service/category.service";

export async function getNewsCategories() {
  try {
    return await getCategories();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

export async function deleteNewsCategory(id) {
  try {
    return await deleteCategory(id);
  } catch (error) {
    console.error("Error deleting category:", error);
    return null;
  }
}

export async function addNewsCategory(category) {
  try {
    return await addCategory(category);
  } catch (error) {
    console.error("Error adding category:", error);
    return null;
  }
}

export async function editNewsCategory(id, category) {
  try {
    return await editCategory(id, category);
  } catch (error) {
    console.error("Error editing category:", error);
    return null;
  }
}
