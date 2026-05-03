import { getAllUsers, manageUserRole } from "../service/auth.service";
import { useGenericCrud } from "./useGenericCrud";
import { useCallback } from "react";

export const useUsers = () => {
  const fetchFn = useCallback((p) => getAllUsers(p), []);

  const updateFn = useCallback((id, data) => {
    return manageUserRole(id, data.role);
  }, []);

  return useGenericCrud({
    fetchFn,
    updateFn,
    itemName: "user",
  });
};