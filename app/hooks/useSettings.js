'use client'

import { useEffect, useState } from "react";
import { getSettings } from "../service/settings.service";
import { useToast } from "../context/ToastContext";

export const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings();
        setSettings(response.data);
      } catch (error) {
        showToast("error", "Failed to fetch settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
};
