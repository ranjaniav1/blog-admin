// hooks/useAuthHook.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { loginUser } from "@/app/utils/auth.util";
import { getAllUsers, manageUserRole } from "../service/auth.service";
import { useToast } from "../context/ToastContext";

export const useAuthHook = (allUserNeeded = false, page = 1) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({ users: [], totalPages: 1, page: 1 });
  const { loginContext } = useAuth();
  const router = useRouter();
  const { showToast, dismissToast } = useToast();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result) {
        loginContext(result.accessToken, result.user);
        router.push("/dashboard");
        showToast("success", "Login successful");
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

  const allUsers = async (page) => {
    setLoading(true);
    try {
      const result = await getAllUsers(page);
      if (result) {
        setUsers(result.data);
      } else {
        return { success: false, error: "No users found" };
      }
    } catch (error) {
      return { success: false, error: error.message || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, role) => {
    setLoading(true);
    const toastId = showToast("loading", "Updating user role...");
    try {
      const result = await manageUserRole(userId, role);
      if (result?.data?.user) {
        const updatedUser = result.data.user;

        // Update the nested user inside users.users array
        setUsers((prevUsers) => ({
          ...prevUsers,
          users: prevUsers.users.map((user) =>
            user._id === userId ? updatedUser : user
          ),
        }));

        // display toast
        showToast(
          "success",
          result.message || "User role updated successfully"
        );

        return { success: true, message: result.message };
      } else {
        return { success: false, error: "Failed to update user role" };
      }
    } catch (error) {
      return { success: false, error: error.message || "Something went wrong" };
    } finally {
      setLoading(false);
      dismissToast(toastId);
    }
  };

  useEffect(() => {
    if (allUserNeeded) {
      allUsers(page);
    }
  }, [allUserNeeded, page]);

  return {
    login,
    loading,
    users,
    updateUserRole,
  };
};
