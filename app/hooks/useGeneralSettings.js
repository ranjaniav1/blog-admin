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

      const storedSettings = localStorage.getItem("panel");
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
          localStorage.setItem("panel", JSON.stringify(panelData));
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
        localStorage.setItem("panel", JSON.stringify(responseData.panel));
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
      // Assuming the updated data contains the themes and other settings
      const updatedPanelData = { ...data };
      console.log("updatedPanelData", updatedPanelData);

      // Check if config and themes exist, and then filter the themes
      const themes = updatedPanelData?.config?.themes || [];
      const filteredThemes = themes.filter(
        (theme) => theme.name === "admin-light" || theme.name === "admin-dark"
      );

      console.log("filteredThemes", filteredThemes);

      // If the config and themes exist, replace the themes array
      if (updatedPanelData?.config) {
        updatedPanelData.config.themes = filteredThemes;
      }

      // Update settings on the server with the new data
      const response = await updateAdminSettings(updatedPanelData);

      // Update localStorage with the updated settings
      if (typeof window !== "undefined") {
        localStorage.setItem("panel", JSON.stringify(response.data));
      }

      console.log("response.data", response.data);
      setSettings(response.data);

      // Example usage with the response.data you've provided
      updateLocalStorageWithFilteredThemes(response.data);
      
      showToast("success", "Settings updated successfully.");
    } catch (error) {
      console.error("Error updating settings:", error); // Log the error for debugging
      showToast("error", "Failed to update settings.");
    } finally {
      setLoading(false);
      dismissToast(toastId);
    }
  };

  return { settings, loading, updateGeneralSettings };
};
