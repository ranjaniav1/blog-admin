import { httpAxios } from "../config/httpAxios";

// GET all tags
export async function getTags(page = 1) {
  try {
    const response = await httpAxios.get(`/tags?page=${page}&offset=10`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return;
  }
}

// POST a new tag
export async function addTag(tag) {
  try {
    const response = await httpAxios.post("/tags", {
      name: tag.name,
      slug: tag.slug,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding tag:", error);
    return;
  }
}

// GET tag by ID
export async function getTagById(id) {
  try {
    const response = await httpAxios.get(`/tags/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tag by ID:", error);
    return;
  }
}

// DELETE tag by ID
export async function deleteTag(id) {
  try {
    const response = await httpAxios.delete(`/tags/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting tag:", error);
    return;
  }
}

// UPDATE tag by ID
export async function editTag(id, tag) {
  try {
    const response = await httpAxios.put(`/tags/${id}`, {
      name: tag.name,
      slug: tag.slug,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing tag:", error);
    return;
  }
}
