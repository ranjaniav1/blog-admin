"use client";

import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import {
  createSocialSetting,
  deleteSocialSetting,
  getSocialSettings,
  updateSocialSetting,
} from "../service/settings.service";

export const useSocialSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast, dismissToast } = useToast();

  const createSocialSettings = async (data) => {
    setLoading(true);
    const toastId = showToast("loading", "Creating settings...");
    try {
      const response = await createSocialSetting(data);
      setSettings(response.data.socialmedia); // ✅ Fix
      showToast("success", "Settings created successfully.");
    } catch (error) {
      showToast("error", "Failed to create settings.");
    } finally {
      setLoading(false);
      dismissToast(toastId);
    }
  };

  const updateSocialSettings = async (id, data) => {
    setLoading(true);
    const toastId = showToast("loading", "Updating settings...");
    try {
      const response = await updateSocialSetting(id, data);
      setSettings(response.data.socialmedia); // ✅ Fix
      showToast("success", "Settings updated successfully.");
    } catch (error) {
      showToast("error", "Failed to update settings.");
    } finally {
      setLoading(false);
      dismissToast(toastId);
    }
  };

  const deleteSocialSettings = async (id) => {
    setLoading(true);
    const toastId = showToast("loading", "Deleting settings...");
    try {
      const response = await deleteSocialSetting(id);
      setSettings(null); // or handle appropriately
      showToast("success", "Settings deleted successfully.");
    } catch (error) {
      showToast("error", "Failed to delete settings.");
    } finally {
      setLoading(false);
      dismissToast(toastId);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await getSocialSettings();
      setSettings(response.data.socialmedia); // ✅ Fix
    } catch (error) {
      showToast("error", "Failed to fetch settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    createSocialSettings,
    updateSocialSettings,
    deleteSocialSettings,
    refetchSettings: fetchSettings, // 🔄 optional helper
  };
};
