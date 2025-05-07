'use client'

import React from "react";
import { useSettings } from "@/app/hooks/useSettings";
import WebSettingsForm from "@/app/components/settings/WebSettingsForm";

const Page = () => {
  const { settings, loading } = useSettings();
  if (loading) return <p>Loading...</p>;
  console.log("Settings:", settings);
  return <WebSettingsForm initialData={settings} />;
};

export default Page;
