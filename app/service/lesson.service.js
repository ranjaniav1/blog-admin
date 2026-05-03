// service/lesson.service.js
import { httpAxios } from "../config/httpAxios";

// Don't use base service for GET - create custom function
export const getLessons = async (page = 1, limit = 10) => {
  try {
    const response = await httpAxios.get(`/lesson?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error;
  }
};

// Use base service for delete
export const deleteLesson = async (id) => {
  try {
    const response = await httpAxios.delete(`/lesson/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting lesson:", error);
    throw error;
  }
};

// Create with FormData
export const createLesson = async (lessonData) => {
  try {
    const response = await httpAxios.post("/lesson", lessonData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating lesson:", error);
    throw error;
  }
};

// Update with FormData
export const updateLesson = async (id, lessonData) => {
  try {
    const response = await httpAxios.put(`/lesson/${id}`, lessonData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating lesson:", error);
    throw error;
  }
};

// Get lessons by series ID
export const getLessonsBySeriesId = async (seriesId) => {
  try {
    const response = await httpAxios.get(`/lesson/series/${seriesId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lessons by series:", error);
    throw error;
  }
};

// Get lesson by slug
export const getLessonBySlug = async (seriesSlug, lessonSlug) => {
  try {
    const response = await httpAxios.get(`/lesson/${seriesSlug}/${lessonSlug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lesson by slug:", error);
    throw error;
  }
};

// Get lesson by ID
export const getLessonById = async (id) => {
  try {
    const response = await httpAxios.get(`/lesson/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lesson by ID:", error);
    throw error;
  }
};