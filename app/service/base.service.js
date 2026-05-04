// service/base.service.js
import { httpAxios } from "../config/httpAxios";

export const createCrudService = (basePath, options = {}) => {
    return {
        getAll: async (page = 1, limit = 10) => {
            try {
                const response = await httpAxios.get(`${basePath}?page=${page}&limit=${limit}`);
                console.log(response)
                return response.data;
            } catch (error) {
                console.error(`Error fetching from ${basePath}:`, error);
                throw error;
            }
        },

        create: async (data) => {
            try {
                const response = await httpAxios.post(basePath, data);
                return response.data;
            } catch (error) {
                console.error(`Error creating at ${basePath}:`, error);
                throw error;
            }
        },

        update: async (id, data) => {
            try {
                // If custom update function provided, use it
                if (options.customUpdate) {
                    return await options.customUpdate(id, data);
                }

                // Default: PUT /endpoint/:id with data
                const response = await httpAxios.put(`${basePath}/${id}`, data);
                return response.data;
            } catch (error) {
                console.error(`Error updating at ${basePath}/${id}:`, error);
                throw error;
            }
        },

        delete: async (id) => {
            try {
                const response = await httpAxios.delete(`${basePath}/${id}`);
                return response.data;
            } catch (error) {
                console.error(`Error deleting at ${basePath}/${id}:`, error);
                throw error;
            }
        },
    };
};