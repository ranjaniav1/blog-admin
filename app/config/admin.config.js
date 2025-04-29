import {
  FaUsers,
  FaListAlt,
  FaCommentDots,
  FaChartBar,
  FaPhotoVideo,
  FaTags,
  FaRss,
  FaBullhorn,
  FaCogs,
  FaFire,
  FaUserEdit,
  FaUserCheck,
  FaBookmark,
  FaStar,
  FaBell,
} from "react-icons/fa";
import { MdSubtitles, MdOutlineArticle } from "react-icons/md";

export const adminRoutes = [
  // --- User Management ---
  {
    title: "Users",
    slug: "/admin/users",
    icon: FaUsers,
    section: "User Management",
    description: "Manage platform users, roles, and access.",
    allowedRoles: ["superadmin"],
  },
  {
    title: "Subscribers",
    slug: "/admin/subscribers",
    icon: FaUserCheck,
    section: "User Management",
    description: "Manage newsletter subscribers.",
    allowedRoles: ["superadmin", "admin"],
  },
  {
    title: "Comments",
    slug: "/admin/comments",
    icon: FaCommentDots,
    section: "User Management",
    description: "Moderate article comments.",
    allowedRoles: ["superadmin", "admin"],
  },
  {
    title: "Bookmarks",
    slug: "/admin/bookmarks",
    icon: FaBookmark,
    section: "User Management",
    description: "View saved articles by users.",
    allowedRoles: ["superadmin", "admin"],
  },

  // --- News Management ---
  {
    title: "Articles",
    slug: "/admin/articles",
    icon: MdOutlineArticle,
    section: "News Management",
    description: "Publish, edit, and archive articles.",
    allowedRoles: ["superadmin", "admin", "writer"],
  },
  {
    title: "Categories",
    slug: "/admin/categories",
    icon: FaListAlt,
    section: "News Management",
    description: "Create and manage news categories.",
    allowedRoles: ["superadmin", "admin"],
  },
  {
    title: "Subcategories",
    slug: "/admin/subcategories",
    icon: MdSubtitles,
    section: "News Management",
    description: "Organize news under subcategories.",
    allowedRoles: ["superadmin", "admin"],
  },
  {
    title: "Tags",
    slug: "/admin/tags",
    icon: FaTags,
    section: "News Management",
    description: "Add and manage article tags.",
    allowedRoles: ["superadmin", "admin", "writer"],
  },
  {
    title: "Author Profiles",
    slug: "/admin/authors",
    icon: FaUserEdit,
    section: "News Management",
    description: "Enhance author bios and social links.",
    allowedRoles: ["superadmin", "admin", "writer"],
  },

  // --- Home Screen ---
  {
    title: "Breaking News",
    slug: "/admin/breaking-news",
    icon: FaFire,
    section: "Home Screen",
    description: "Manage urgent headlines.",
    allowedRoles: ["superadmin", "admin"],
  },
  {
    title: "Recommendations",
    slug: "/admin/recommendations",
    icon: FaStar,
    section: "Home Screen",
    description: "AI/user-based recommended content.",
    allowedRoles: ["superadmin", "admin"],
  },

  // --- Other ---
  {
    title: "Media Library",
    slug: "/admin/media",
    icon: FaPhotoVideo,
    section: "Other",
    description: "Upload and manage images, videos, and audio.",
    allowedRoles: ["superadmin", "admin", "writer"],
  },
  {
    title: "RSS Feeds",
    slug: "/admin/rss",
    icon: FaRss,
    section: "Other",
    description: "Configure RSS feed sources.",
    allowedRoles: ["superadmin"],
  },
  {
    title: "Notifications",
    slug: "/admin/notifications",
    icon: FaBell,
    section: "Other",
    description: "Send and manage system notifications.",
    allowedRoles: ["superadmin", "admin"],
  },
  {
    title: "Analytics",
    slug: "/admin/analytics",
    icon: FaChartBar,
    section: "Other",
    description: "Track views, reads, and shares per article.",
    allowedRoles: ["superadmin", "admin"],
  },

  // --- Ads ---
  {
    title: "Sponsored Ads",
    slug: "/admin/ads",
    icon: FaBullhorn,
    section: "Ads",
    description: "Manage sponsor ads and campaigns.",
    allowedRoles: ["superadmin", "admin"],
  },

  // --- Settings ---
  {
    title: "Settings",
    slug: "/admin/settings",
    icon: FaCogs,
    section: "Settings",
    description: "Platform-wide admin configuration.",
    allowedRoles: ["superadmin"],
  },
];

export const Webname = "ENews";

export const currentUserRole = "superadmin"; // This should be dynamically set based on the logged-in user