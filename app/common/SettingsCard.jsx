import Link from "next/link";

export default function SettingsCard({ icon, title, link, isActive = false }) {
  return (
    <Link href={link}>
      <div className="w-full h-[180px] p-6 rounded-xl border transition-all duration-300 shadow-sm cursor-pointer flex flex-col justify-between relative overflow-hidden group primary">
        {/* Background fill effect */}
        <div
          className={`absolute top-0 left-0 w-full h-full bg-blue-500 transform origin-left transition-all duration-2000 ease-out group-hover:scale-x-100 scale-x-0`}
        />
        
        <div
          className={`relative text-5xl transition-all duration-300 p-3 rounded-full w-max group-hover:bg-white group-hover:text-blue-500 ${
            isActive ? "bg-blue-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {icon}
        </div>
        
        <div className="relative flex flex-col justify-between">
          <h3 className="text-xl font-semibold group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm mt-1 underline underline-offset-4 group-hover:text-white transition-colors duration-300">
            Go to Settings →
          </p>
        </div>
      </div>
    </Link>
  );
}
