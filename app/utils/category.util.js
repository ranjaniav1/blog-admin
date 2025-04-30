import { getCategories } from "../service/category.service";

export async function getNewsCategories() {
  try {
    const response = await getCategories();
    return response.data;
  } catch (error) {
    console.log("Error fetching categories:", error);
    return null;
  }
}
