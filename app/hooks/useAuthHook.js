'use client'
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "../context/ToastContext";
import { loginUser } from "../utils/auth.util";

export const useAuthHook = () => {
  const [loading, setLoading] = useState(false);
  const { loginContext } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await loginUser(email, password);

      if (result) {
        loginContext(result.accessToken, result.user);
        router.push("/dashboard");
        showToast("success", "Login successful");
        return { success: true };
      }

      return { success: false, error: "Invalid credentials" };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};