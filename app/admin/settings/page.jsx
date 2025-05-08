"use client";

import React from "react";
import { useSettings } from "@/app/hooks/useWebSettings";
import SettingsCard from "@/app/common/SettingsCard";
import { IoSettings, IoLinkSharp  } from "react-icons/io5";
import { MdOutlineComputer } from "react-icons/md";


const Page = () => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-4">
      <SettingsCard
        icon={<IoSettings />}
        title="General Settings"
        link="/admin/settings/general"
      />
      <SettingsCard
        icon={<IoLinkSharp  />}
        title="Social Media Settings"
        link="/admin/settings/social"
      />
      <SettingsCard
        icon={<MdOutlineComputer />}
        title="Front End Settings"
        link="/admin/settings/frontend"
      />
      {/* Add more cards as needed */}
    </div>
  );
};

export default Page;
