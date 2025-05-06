import Link from "next/link";

const SidebarLink = ({ title, slug, icon: Icon, isActive, section }) => {
  return (
    <div
      className={`group ${section === "ads" || section === "settings" ? "mt-6 border-b-2" : ""}`}
    >
      <Link href={slug}>
        <div
          className={`flex items-center gap-2 p-4 my-rounded transition-all duration-200 ${
            isActive ? "active text-white" : ""
          } link`}
        >
          {Icon && <Icon className="text-lg" />}
          <span>{title}</span>
        </div>
      </Link>
      {(section === "ads" || section === "settings") && (
        <hr className="border-t border-gray-300 mt-3" />
      )}
    </div>
  );
};


export default SidebarLink;
