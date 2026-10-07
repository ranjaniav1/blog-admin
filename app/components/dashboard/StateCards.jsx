import DashboardStatsCard from "@/app/common/DashboardStateCards";
import {
  FaUsers,
  FaFileAlt,
  FaCommentDots,
  FaStar,
  FaFire,
  FaCheckCircle,
  FaEdit,
  FaClock,
} from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";

const StateCards = ({ data }) => {
  const stats = [
    {
      title: "Total Users",
      value: data?.totalUsers ?? 0,
      icon: FaUsers,
      color: "#3B82F6",
      href: "/admin/users",
    },
    {
      title: "Total Categories",
      value: data?.totalCategories ?? 0,
      icon: BiSolidCategory,
      color: "#10B981",
      href: "/admin/categories",
    },
    {
      title: "Total Articles",
      value: data?.totalArticles ?? 0,
      icon: FaFileAlt,
      color: "#F59E0B",
      href: "/admin/articles",
    },
    {
      title: "Total Comments",
      value: data?.totalComments ?? 0,
      icon: FaCommentDots,
      color: "#EF4444",
      href: "/admin/comments",
    },
    {
      title: "Featured Articles",
      value: data?.featuredCount ?? 0,
      icon: FaStar,
      color: "#EAB308",
    },
    {
      title: "Breaking News",
      value: data?.breakingCount ?? 0,
      icon: FaFire,
      color: "#F97316",
    },
    {
      title: "Published Articles",
      value: data?.publishedCount ?? 0,
      icon: FaCheckCircle,
      color: "#22C55E",
    },
    {
      title: "Draft Articles",
      value: data?.draftCount ?? 0,
      icon: FaEdit,
      color: "#64748B",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 mb-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <DashboardStatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StateCards;