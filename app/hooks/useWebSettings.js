"use client";

import { useEffect, useState } from "react";
import { getSettings, updateSetting } from "../service/settings.service";
import { useToast } from "../context/ToastContext";

export const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast, dismissToast } = useToast();

  const updateWebSettings = async (id, data) => {
    setLoading(true);
    const toastId = showToast("loading", "Updating settings...");
    try {
      const response = await updateSetting(id, data);
      setSettings(response.data);
      showToast("success", "Settings updated successfully.");
    } catch (error) {
      showToast("error", "Failed to update settings.");
    } finally {
      setLoading(false);
      dismissToast(toastId);
    }
  };

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

  return { settings, loading, updateWebSettings };
};
