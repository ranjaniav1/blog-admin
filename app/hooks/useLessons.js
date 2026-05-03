// hooks/useLessons.js
import { useCallback } from "react";
import { useGenericCrud } from "./useGenericCrud";
import {
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../service/lesson.service";

// Transform API response to match generic CRUD expected format
const transformResponse = (response) => {
  console.log("Raw lessons response:", response);
  
  if (!response || !response.data) {
    return { items: [], totalPages: 1, currentPage: 1 };
  }
  
  // Handle your API response structure
  // Your API returns: { data: { lessons: [...], totalLessons, totalPages, page } }
  return {
    items: response.data.lessons || [],
    totalPages: response.data.totalPages || 1,
    currentPage: response.data.page || 1,
    total: response.data.totalLessons || 0,
  };
};

export const useLessons = (page = 1) => {
  const fetchFn = useCallback(async (p) => {
    const response = await getLessons(p);
    return transformResponse(response);
  }, []);
  
  const addFn = useCallback((data) => createLesson(data), []);
  const updateFn = useCallback((id, data) => updateLesson(id, data), []);
  const deleteFn = useCallback((id) => deleteLesson(id), []);

  return useGenericCrud({
    fetchFn,
    addFn,
    updateFn,
    deleteFn,
    initialPage: page,
    itemName: "Lesson",
  });
};