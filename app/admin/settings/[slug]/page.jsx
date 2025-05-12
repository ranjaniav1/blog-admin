"use client";

import React from "react";
import { useParams } from "next/navigation";
import WebSettingsForm from "@/app/components/settings/WebSettingsForm";
import SocialSettingsForm from "@/app/components/settings/SocialSettingsForm";
import GeneralSettingsForm from "@/app/components/settings/GeneralSettingsForm";

const page = () => {
  const { slug } = useParams();

  if (slug === "panel") {
    return <GeneralSettingsForm />;
  }

  if (slug === "social") {
    return <SocialSettingsForm />;
  }

  if (slug === "frontend") {
    return <WebSettingsForm />;
  }
};

export default page;
