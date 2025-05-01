import axios from "axios";

export const httpAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Fix: use true, not "include"
});

// Interceptor to handle 401 errors and refresh the token
httpAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 error and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Try hitting refresh endpoint
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
          withCredentials: true,
        });
        console.log("Token refreshed successfully");

        // Retry the original request
        return httpAxios(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        // Redirect to login or handle logout
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
