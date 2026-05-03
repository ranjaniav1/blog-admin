"use client";

import { useState, useEffect } from "react";
import {
  adminRoutes,
  currentUserRole,
} from "@/app/config/admin.config";
import SidebarLink from "@/app/common/SidebarLink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGeneralSettings } from "@/app/hooks/useGeneralSettings";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Sidebar = () => {
  const pathname = usePathname();
  const { settings } = useGeneralSettings();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
        setIsMobileOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredRoutes = adminRoutes.filter((route) =>
    route.allowedRoles.includes(currentUserRole)
  );

  const sections = [...new Set(filteredRoutes.map((r) => r.section))];

  const closeMobileSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={`nav h-full overflow-y-auto scrollbar-hide scrollbar-hover transition-all duration-300 flex flex-col ${
          isMobile
            ? `fixed top-0 left-0 z-50 w-72 transform ${
                isMobileOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : `relative ${isCollapsed ? 'w-20' : 'w-80'}`
        }`}
      >
        {/* Logo Section */}
        <div className={`p-3  ${isCollapsed ? 'px-3' : ''}`}>
          <Link href={"/"} className="flex" onClick={closeMobileSidebar}>
            <img
              src={settings?.logo || "/logo.png"}
              alt="Logo"
              className={`object-contain transition-all ${
                isCollapsed ? 'h-10 w-10' : 'h-12'
              }`}
            />
          </Link>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 p-4 space-y-6">
          {sections.map((section) => (
            <div key={section}>
              {!isCollapsed && (
                <div className="mb-3 px-3">
                  <h2 className="text-xs font-semibold uppercase tracking-wider secondary-text">
                    {section}
                  </h2>
                  <div className="mt-2 h-px bg-border" />
                </div>
              )}
              
              <div className="space-y-1">
                {filteredRoutes
                  .filter((r) => r.section === section)
                  .map((route) => (
                    <SidebarLink
                      key={`${section}-${route.slug}`}
                      {...route}
                      isActive={pathname.includes(route.slug)}
                      isCollapsed={isCollapsed}
                      onClose={closeMobileSidebar}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer with Collapse Button */}
      <div className={`border-t my-border bg-cardbg ${isCollapsed ? 'p-2' : 'p-2'}`}>
  {!isMobile && (
    <button
      onClick={() => setIsCollapsed(!isCollapsed)}
      className={`w-full flex items-center transition-all duration-200 rounded-lg hover:bg-hover ${
        isCollapsed ? 'justify-center p-2' : 'justify-end p-2'
      }`}
      title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <FiChevronLeft className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''} icon-default text-lg`} />
    </button>
  )}
</div>
      </div>
    </>
  );
};

export default Sidebar;