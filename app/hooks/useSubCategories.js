// hooks/useSubcategories.js
import { useCallback } from "react";
import { useGenericCrud } from "./useGenericCrud";
import {
  getSubcategories,
  addSubcategory,
  editSubcategory,
  deleteSubcategory,
} from "../service/subcategory.service";

// Adapter to transform API response to expected format
const transformResponse = (response) => {
  // response comes from baseService.getAll which returns response.data
  // which has { statusCode, data, success }
  if (!response || !response.success) {
    return { items: [], totalPages: 1, currentPage: 1 };
  }

  // The subcategories are in response.data.subcategories
  const responseData = response.data;
  
  return {
    items: responseData?.subcategories || [],
    totalPages: responseData?.totalPages || 1,
    currentPage: responseData?.page || 1,
    total: responseData?.totalSubCategories || 0,
  };
};

export const useSubcategories = (page = 1) => {
  const fetchFn = useCallback(async (p) => {
    const response = await getSubcategories(p);
    console.log("Raw response:", response);
    const transformed = transformResponse(response);
    console.log("Transformed:", transformed);
    return transformed;
  }, []);
  
  const addFn = useCallback(async (data) => {
    const response = await addSubcategory(data);
    return response;
  }, []);
  
  const updateFn = useCallback(async (id, data) => {
    const response = await editSubcategory(id, data);
    return response;
  }, []);
  
  const deleteFn = useCallback(async (id) => {
    const response = await deleteSubcategory(id);
    return response;
  }, []);

  return useGenericCrud({
    fetchFn,
    addFn,
    updateFn,
    deleteFn,
    initialPage: page,
    itemName: "Subcategory",
  });
};