import { httpAxios } from "../config/httpAxios";

export async function getSettings() {
  try {
    const resposne = await httpAxios.get("/web-setting");
    return resposne.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
}
