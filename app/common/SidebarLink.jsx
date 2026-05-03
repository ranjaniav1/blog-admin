"use client";
import Link from "next/link";

const SidebarLink = ({ title, slug, icon: Icon, isActive, section, isCollapsed, onClose }) => {
  return (
    <div className="group">
      <Link href={slug} onClick={onClose}>
        <div
          className={`flex items-center transition-all duration-200 cursor-pointer rounded-xl ${
            isActive
              ? "active-text bg-hover"
              : "link hover:bg-hover"
          } ${isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'}`}
        >
          {Icon && (
            <Icon 
              className={`text-xl ${isActive ? 'icon-main' : 'icon-default'}`} 
            />
          )}
          {!isCollapsed && (
            <span className={`text-sm font-medium ${isActive ? 'active-text' : ''}`}>
              {title}
            </span>
          )}
        </div>
      </Link>
      
      {section === "Settings" && !isCollapsed && (
        <div className="mt-2 mx-4 h-px bg-border" />
      )}
    </div>
  );
};

export default SidebarLink;