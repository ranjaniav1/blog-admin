"use client";

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

  useEffect(() => {
    const fetchSettings = async () => {
      // Ensure this only runs on the client
      if (typeof window === "undefined") return;

      const storedSettings = sessionStorage.getItem("panel");
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
        setLoading(false);
        return;
      }

      try {
        const response = await getAdminSettings();

        // Log response for debugging
        console.log("API Response:", response);

        if (
          response?.data &&
          response.data.panel &&
          response.data.panel.config
        ) {
          const panelData = response.data.panel;
          // Store in localStorage
          sessionStorage.setItem("panel", JSON.stringify(panelData));
          setSettings(panelData);
        } else {
          // If response structure is incorrect or missing expected data
          throw new Error("Invalid API response structure.");
        }
      } catch (error) {
        // Log error for debugging
        console.error("Fetch error:", error);
        showToast("error", "Failed to fetch settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateLocalStorageWithFilteredThemes = (responseData) => {
    try {
      // Extract the themes from the response data
      const themes = responseData.panel.config.themes;

      // Update localStorage with the filtered panel data
      if (typeof window !== "undefined") {
        sessionStorage.setItem("panel", JSON.stringify(responseData.panel));
      }

      console.log(
        "Panel updated in localStorage with filtered themes:",
        responseData.panel
      );
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  };

  const updateGeneralSettings = async (data) => {
    setLoading(true);
    const toastId = showToast("loading", "Updating settings...");

    try {
      let payloadToSend = data;

      // If data is NOT FormData, we can filter themes before sending
      if (!(data instanceof FormData)) {
        // Clone data object to avoid mutation
        const updatedPanelData = { ...data };

        const themes = updatedPanelData?.config?.themes || [];
        const filteredThemes = themes.filter(
          (theme) => theme.name === "admin-light" || theme.name === "admin-dark"
        );

        if (updatedPanelData?.config) {
          updatedPanelData.config.themes = filteredThemes;
        }

        payloadToSend = updatedPanelData;
        console.log("Payload with filtered themes:", payloadToSend);
      } else {
        // For FormData, just send as is
        console.log("Sending FormData payload");
      }

      // Call updateAdminSettings with the correct payload
      const response = await updateAdminSettings(payloadToSend);

      // After update, update sessionStorage and settings state consistently
      if (response?.data?.panel) {
        sessionStorage.setItem("panel", JSON.stringify(response.data.panel));
        setSettings(response.data.panel);
        updateLocalStorageWithFilteredThemes(response.data);
      } else {
        // fallback if response shape is different
        sessionStorage.setItem("panel", JSON.stringify(response.data));
        setSettings(response.data);
      }

      showToast("success", "Settings updated successfully.");
    } catch (error) {
      console.error("Error updating settings:", error);
      showToast("error", "Failed to update settings.");
    } finally {
      setLoading(false);
      dismissToast(toastId);
    }
  };

  return { settings, loading, updateGeneralSettings };
};
