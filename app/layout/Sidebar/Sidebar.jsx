"use client";

import { useState } from "react";
import {
  adminRoutes,
  currentUserRole,
  Webname,
} from "@/app/config/admin.config";
import SidebarLink from "@/app/common/SidebarLink";
import Link from "next/link";
import Poligon from "@/app/common/Poligon";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname(); // ✅

  // Filter routes based on role
  const filteredRoutes = adminRoutes.filter((route) =>
    route.allowedRoles.includes(currentUserRole)
  );

  // Derive sections from only the filtered routes
  const sections = [...new Set(filteredRoutes.map((r) => r.section))];

  return (
    <div className="primary h-full p-4 overflow-y-auto scrollbar-hide scrollbar-hover">
      <Link href={"/"}>
        <div className="flex p-4 gap-3 items-center">
          <Poligon fill={"#000"} text={Webname.slice(0, 1)} />
          <h1 className="font-bold text-2xl">{Webname}</h1>
        </div>
      </Link>

      <div className="space-y-4 overflow-y-auto">
        {sections.map((section) => (
          <div key={section}>
            <h2 className="text-lg font-semibold my-2 text-gray-700 uppercase tracking-wider">
              {section}
            </h2>
            <div className="space-y-2">
              {filteredRoutes
                .filter((r) => r.section === section)
                .map((route) => (
                  <SidebarLink
                    key={route.slug}
                    {...route}
                    isActive={pathname.includes(route.slug)} // ✅ URL-based active state
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
