import { httpAxios } from "../config/httpAxios";
import { createCrudService } from "./base.service";

// Create base service with custom update for series
export const seriesService = createCrudService("/series", {
  customUpdate: async (id, series) => {
    const response = await httpAxios.put(`/series/${id}`, series, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
});

// Use base service for standard operations
export const getSeries = (page) => seriesService.getAll(page);
export const addSeries = (data) => seriesService.create(data);
export const editSeries = (id, data) => seriesService.update(id, data);
export const deleteSeries = (id) => seriesService.delete(id);

// Extra features if needed
export const getSeriesById = async (id) => {
  try {
    const response = await httpAxios.get(`/series/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching series by ID:", error);
    throw error;
  }
};

export const getSeriesBySlug = async (slug) => {
  try {
    const response = await httpAxios.get(`/series/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching series by slug:", error);
    throw error;
  }
};