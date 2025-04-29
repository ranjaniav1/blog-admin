import DashboardStatsCard from "@/common/DashboardStateCards";
import {
  FaUsers,
  FaDollarSign,
  FaFileAlt,
  FaCommentDots,
} from "react-icons/fa";

// TODO: it should be dynamic data from the server
// but for now we will use static data
const stats = [
  {
    title: "Total Users",
    value: 1289,
    icon: FaUsers,
    color: "#3B82F6", // blue
  },
  {
    title: "Total Subscribers",
    value: "$52,430",
    icon: FaDollarSign,
    color: "#10B981", // green
  },
  {
    title: "Total Articles",
    value: 764,
    icon: FaFileAlt,
    color: "#F59E0B", // amber
  },
  {
    title: "Total Comments",
    value: 2034,
    icon: FaCommentDots,
    color: "#EF4444", // red
  },
];

const StateCards = () => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-2">
      {stats.map((stat, index) => (
        <DashboardStatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StateCards;
