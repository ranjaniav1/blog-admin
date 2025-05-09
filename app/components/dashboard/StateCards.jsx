import DashboardStatsCard from "@/app/common/DashboardStateCards";
import { FaUsers, FaFileAlt, FaCommentDots, FaStar, FaFire } from "react-icons/fa";
import { BiSolidCategory, BiSubdirectoryRight } from "react-icons/bi";

const StateCards = ({ data }) => {
  const stats = [
    {
      title: "Total Users",
      value: data?.totalUsers,
      icon: FaUsers,
      color: "#3B82F6", // blue
      href: "/admin/users",
    },
    {
      title: "Total Categories",
      value: data?.totalCategories,
      icon: BiSolidCategory,
      color: "#10B981", // green
      href: "/admin/categories",
    },
    {
      title: "Total Sub-Categories",
      value: data?.totalSubCategories,
      icon: BiSubdirectoryRight,
      color: "#8B5CF6", // violet
      href: "/admin/sub-categories",
    },
    {
      title: "Total Articles",
      value: data?.totalArticles,
      icon: FaFileAlt,
      color: "#F59E0B", // amber
      href: "/admin/articles",
    },
    {
      title: "Total Comments",
      value: data?.totalComments,
      icon: FaCommentDots,
      color: "#EF4444", // red
      href: "/admin/comments",
    },
    {
      title: "Featured Articles",
      value: data?.featuredCount,
      icon: FaStar,
      color: "#EAB308", // yellow
    },
    {
      title: "Breaking News",
      value: data?.breakingCount,
      icon: FaFire,
      color: "#F97316", // orange
    },
  ];

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
      {stats.map((stat, index) => (
        <DashboardStatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StateCards;
