"use client";

import { useState, useEffect } from "react";
import {
  getThemes,
  createTheme,
  deleteTheme,
  updateTheme,
} from "@/app/service/theme.service";

export function useThemes() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all themes initially
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setLoading(true);
        const data = await getThemes();
        setThemes(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const create = async (newTheme) => {
    const created = await createTheme(newTheme);
    setThemes((prev = []) => [...prev, created]);
    return created;
  };

  const update = async (id, updatedData) => {
    const updated = await updateTheme(id, updatedData);
    setThemes((prev = []) =>
      Array.isArray(prev)
        ? prev.map((theme) => (theme._id === id ? updated : theme))
        : [updated]
    );
    return updated;
  };

  const remove = async (id) => {
    await deleteTheme(id);
    setThemes((prev = []) =>
      Array.isArray(prev) ? prev.filter((theme) => theme._id !== id) : []
    );
  };

  return {
    themes,
    loading,
    error,
    createTheme: create,
    updateTheme: update,
    deleteTheme: remove,
    refetch: async () => {
      const data = await getThemes();
      setThemes(Array.isArray(data) ? data : []);
    },
  };
}
