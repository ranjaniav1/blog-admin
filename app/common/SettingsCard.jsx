import Link from "next/link";
import { TbArrowNarrowRightDashed } from "react-icons/tb";

export default function SettingsCard({ icon, title, link, isActive = false }) {
  return (
    <Link href={link}>
      <div className="w-full h-[180px] p-6 rounded-xl border border-gray-200 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group bg-white hover:shadow-lg">
        {/* Background fill effect */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-blue-500 transform origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 scale-x-0"
        />

        {/* Icon */}
        <div
          className={`relative text-4xl transition-all duration-300 p-3 rounded-full w-14 h-14 flex items-center justify-center z-10 ${
            isActive ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
          } group-hover:bg-white group-hover:text-blue-500`}
        >
          {icon}
        </div>

        {/* Title & CTA */}
        <div className="relative z-10 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm mt-1 underline-offset-4 text-gray-500 group-hover:text-white transition-colors duration-300 flex items-center gap-1">
            Go to Settings{" "}
            <TbArrowNarrowRightDashed className="text-2xl mt-[2px]" />
          </p>
        </div>
      </div>
    </Link>
  );
}
