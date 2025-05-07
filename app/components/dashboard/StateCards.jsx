import DashboardStatsCard from "@/app/common/DashboardStateCards";
import { FaUsers, FaFileAlt, FaCommentDots } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";

// TODO: it should be dynamic data from the server
// but for now we will use static data

const StateCards = ({ data }) => {
  const stats = [
    {
      title: "Total Users",
      value: data?.totalUsers,
      icon: FaUsers,
      color: "#3B82F6", // blue
    },
    {
      title: "Total Categories",
      value: data?.totalCategories,
      icon: BiSolidCategory,
      color: "#10B981", // green
    },
    {
      title: "Total Articles",
      value: data?.totalArticles,
      icon: FaFileAlt,
      color: "#F59E0B", // amber
    },
    {
      title: "Total Comments",
      value: data?.totalComments,
      icon: FaCommentDots,
      color: "#EF4444", // red
    },
  ];

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-2">
      {stats.map((stat, index) => (
        <DashboardStatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StateCards;
