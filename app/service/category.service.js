import { httpAxios } from "../config/httpAxios";

export async function getCategories() {
    try {
        const response = await httpAxios.get("/category");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return;
    }
}