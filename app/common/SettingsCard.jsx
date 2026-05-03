import Link from "next/link";
import { TbArrowNarrowRightDashed } from "react-icons/tb";

export default function SettingsCard({ icon, title, link, isActive = false }) {
  return (
    <Link href={link}>
      <div className="w-full h-[180px] p-6 my-rounded transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden settings-group card hover:shadow-lg">
        {/* Background fill effect */}
        <div className="animated-bar" />

        {/* Icon */}
        <div
          className={`relative text-4xl transition-all duration-300 p-3 rounded-full w-14 h-14 flex items-center justify-center z-10 ${
            isActive ? "active" : "bg-blue-100 active-text"
          }  link`}
        >
          {icon}
        </div>

        {/* Title & CTA */}
        <div className="relative z-10 mt-4">
          <h3 className="text-lg font-semibold transition-colors duration-300">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
