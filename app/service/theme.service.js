import { httpAxios } from "../config/httpAxios";

async function getThemes() {
  try {
    const response = await httpAxios.get("/themes");
    return response.data;
  } catch (error) {
    console.error("Error fetching themes:", error);
    throw error;
  }
}

async function createTheme(data) {
  try {
    const response = await httpAxios.post("/themes", data);
    return response.data;
  } catch (error) {
    console.error("Error creating theme:", error);
    throw error;
  }
}

async function deleteTheme(id) {
  try {
    const response = await httpAxios.delete(`/themes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting theme:", error);
    throw error;
  }
}

async function updateTheme(id, data) {
  try {
    const response = await httpAxios.put(`/themes/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating theme:", error);
    throw error;
  }
}

export { getThemes, createTheme, deleteTheme, updateTheme };
