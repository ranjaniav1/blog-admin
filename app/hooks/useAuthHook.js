// hooks/useAuthHook.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { loginUser } from "@/app/utils/auth.util";

export const useAuthHook = () => {
  const [loading, setLoading] = useState(false);
  const { loginContext } = useAuth();
  const router = useRouter();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result) {
        loginContext(result.accessToken, result.user);
        router.push("/dashboard");
        return { success: true };
      } else {
        return { success: false, error: "Invalid credentials" };
      }
    } catch (error) {
      return { success: false, error: error.message || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
};
