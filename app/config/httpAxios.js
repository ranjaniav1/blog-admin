// export const httpAxios = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

import axios from "axios";

// httpAxios.interceptors.request.use((config) => {
//   const token = Cookies.get("access_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
// utils/httpAxios.js

const httpAxios = axios.create({
  baseURL: "https://enews-admin-panel-backend.vercel.app/api", // or your live backend URL
  withCredentials: true, // ✅ Send cookies
});

export { httpAxios };
