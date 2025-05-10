import Link from "next/link";
import Poligon from "./Poligon";

const DashboardStatsCard = ({ title, value, icon: Icon, color, href }) => {
  return (
    <Link href={href || "#"}>
      <div className="card p-5 my-rounded shadow-sm flex items-center gap-4">
        <Poligon Icon={Icon} fill={color} />
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
      </div>
    </Link>
  );
};

export default DashboardStatsCard;
