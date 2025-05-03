import { httpAxios } from "../config/httpAxios";

export async function getCategories() {
  try {
    const response = await httpAxios.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return;
  }
}

export async function addCategory(category) {
  try {
    const response = await httpAxios.post("/categories", {
      name: category.name,
      description: category.description,
      slug: category.slug,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    return;
  }
}

export async function deleteCategory(id) {
  try {
    const response = await httpAxios.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error editing category:", error);
    return;
  }
}

export async function editCategory(id, category) {
  try {
    const response = await httpAxios.put(`/categories`, {
      category_id: id,
      name: category.name,
      description: category.description,
      slug: category.slug,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing category:", error);
    return;
  }
}
