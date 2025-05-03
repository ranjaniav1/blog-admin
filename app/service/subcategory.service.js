import { httpAxios } from "../config/httpAxios";

export async function getSubcategories(page) {
  try {
    const response = await httpAxios.get(`/subcategories?offset=10&page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return;
  }
}

export async function addSubcategory(subcategory) {
  try {
    const response = await httpAxios.post("/subcategories/", {
      name: subcategory.name,
      description: subcategory.description,
      slug: subcategory.slug,
      category_id: subcategory.category_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding subcategory:", error);
    return;
  }
}

export async function deleteSubcategory(id) {
  try {
    const response = await httpAxios.delete(`/subcategories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    return;
  }
}

export async function editSubcategory(id, subcategory) {
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
    console.error("Error updating subcategory:", error);
    return;
  }
}


export async function getSubcategoriesByCatSlug(slug) {
  try {
    const response = await httpAxios.get(`/subcategories/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return;
  }
}