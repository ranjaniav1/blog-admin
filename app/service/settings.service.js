import { httpAxios } from "../config/httpAxios";

// ------------------------------ FrontEnd Settings ------------------------------ //

export async function getSettings() {
  try {
    const resposne = await httpAxios.get("/web-setting");
    return resposne.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
}

export async function updateSetting(id, data) {
  try {
    const resposne = await httpAxios.put(`/web-setting/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return resposne.data;
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
}

// -------------------------------- Social Settings ------------------------------- //

export async function getSocialSettings() {
  try {
    const resposne = await httpAxios.get("/social-media");
    return resposne.data;
  } catch (error) {
    console.error("Error fetching social settings:", error);
    throw error;
  }
}
export async function createSocialSetting(data) {
  try {
    const response = await httpAxios.post("/social-media", data, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating social settings:", error);
    throw error;
  }
}

export async function updateSocialSetting(id, data) {
  try {
    const resposne = await httpAxios.put(`/social-media/${id}`, data);
    return resposne.data;
  } catch (error) {
    console.error("Error updating social settings:", error);
    throw error;
  }
}

export async function deleteSocialSetting(id) {
  try {
    const resposne = await httpAxios.delete(`/social-media/${id}`);
    return resposne.data;
  } catch (error) {
    console.error("Error deleting social settings:", error);
    throw error;
  }
}

// -------------------------------- Admin Settings -------------------------------- //

export async function getAdminSettings() {
  try {
    const resposne = await httpAxios.get("/panel");
    return resposne.data;
  } catch (error) {
    console.error("Error fetching admin settings:", error);
    throw error;
  }
}

export async function updateAdminSettings(data) {
  try {
    const resposne = await httpAxios.put("/panel/update", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return resposne.data;
  } catch (error) {
    console.error("Error updating admin settings:", error);
    throw error;
  }
}

export async function createAdminSettings(data) {
  try {
    const resposne = await httpAxios.post("/panel", data);
    return resposne.data;
  } catch (error) {
    console.error("Error creating admin settings:", error);
    throw error;
  }
}
