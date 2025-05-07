import { httpAxios } from "../config/httpAxios";

export async function getDashboardData() {
    try {
        const response = await httpAxios.get("/dashboard");
        return response;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}