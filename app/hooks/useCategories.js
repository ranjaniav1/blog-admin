import { useCallback } from "react";
import { addCategory, deleteCategory, editCategory, getCategories } from "../service/category.service";
import { useGenericCrud } from "./useGenericCrud";

export const useCategories = (page = 1) => {
  const fetchFn = useCallback((p) => getCategories(p), []);
  const addFn = useCallback((data) => addCategory(data), []);
  const updateFn = useCallback((id, data) => editCategory(id, data), []);
  const deleteFn = useCallback((id) => deleteCategory(id), []);

  return useGenericCrud({
    fetchFn,
    addFn,
    updateFn,
    deleteFn,
    initialPage: page,
    itemName: "Category",
  });
};