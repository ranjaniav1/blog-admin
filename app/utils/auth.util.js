// utils/auth.util.js
import { login as loginService } from "../service/auth.service";

export async function loginUser(email, password) {
  try {
    const response = await loginService(email, password);
    if (response?.data) {
      const { accessToken, user } = response.data;
      return { accessToken, user };
    }
    return null;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
}
