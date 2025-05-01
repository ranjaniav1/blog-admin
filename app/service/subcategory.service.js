import { httpAxios } from "../config/httpAxios";

export async function getSubcategories() {
  try {
    const response = await httpAxios.get("/subcategory");
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return;
  }
}

export async function addSubcategory(subcategory) {
  try {
    const response = await httpAxios.post("/subcategory/create_sub_category", {
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
    const response = await httpAxios.delete(`/subcategory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    return;
  }
}

export async function editSubcategory(id, subcategory) {
  try {
    const response = await httpAxios.put(`/subcategory/update`, {
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
