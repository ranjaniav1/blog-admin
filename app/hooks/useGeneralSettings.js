'use client';

import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import {
  getAdminSettings,
  updateAdminSettings,
} from "../service/settings.service";

export const useGeneralSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast, dismissToast } = useToast();

  const fetchSettings = async () => {
    try {
      const response = await getAdminSettings();
      setSettings(response.data);
    } catch (error) {
      showToast("error", "Failed to fetch settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateGeneralSettings = async (data) => {
    setLoading(true);
    const toastId = showToast("loading", "Updating settings...");
    try {
      const response = await updateAdminSettings(data);
      setSettings(response.data);
      showToast("success", "Settings updated successfully.");
    } catch (error) {
      showToast("error", "Failed to update settings.");
    } finally {
      setLoading(false);
      dismissToast(toastId);
    }
  };

  return { settings, loading, updateGeneralSettings };
};
