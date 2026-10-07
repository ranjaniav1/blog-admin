// config/admin.config.js
import {
  FaUsers,
  FaListAlt,
  FaCommentDots,
  FaTags,
  FaCogs,
  FaBook,
  FaLayerGroup,
} from "react-icons/fa";
import { MdSubtitles, MdOutlineArticle, MdSpaceDashboard } from "react-icons/md";
import { format } from "date-fns";

// ------------------------ Admin Routes ------------------------
export const adminRoutes = [
  {
    title: "Dashboard",
    slug: "/dashboard",
    icon: MdSpaceDashboard,
    section: "Dashboard",
    description: "Overview of platform statistics.",
    allowedRoles: ["superadmin", "admin"],
  },
  {
    title: "Users",
    slug: "/admin/users",
    icon: FaUsers,
    section: "User Management",
    description: "Manage platform users, roles, and access.",
    allowedRoles: ["superadmin", "admin"],
  },
  {
    title: "Comments",
    slug: "/admin/comments",
    section: "User Management",

    icon: FaCommentDots,
    description: "Moderate article comments.",
    allowedRoles: ["superadmin", "admin"],
  },
  {
    title: "Articles",
    slug: "/admin/articles",
    icon: MdOutlineArticle,
    section: "News Management",
    description: "Publish, edit, and archive articles.",
    allowedRoles: ["superadmin", "admin", "author"],
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
    title: "Settings",
    slug: "/admin/settings",
    icon: FaCogs,
    section: "Settings",
    description: "Platform-wide admin configuration.",
    allowedRoles: ["superadmin"],
  },
];

export const Webname = "Blog";
export const currentUserRole = "superadmin";

// Helper function for date formatting
const formatDate = (val) => {
  const date = new Date(val);
  return isNaN(date) ? "Invalid Date" : format(date, "PPP");
};

// ------------------------ Categories Configuration ------------------------
export const categoryFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Enter category name",
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    required: true,
    placeholder: "Enter slug",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
    placeholder: "Enter description",
  },
];

export const categoryColumns = [
  { label: "Name", accessor: "name", filterable: true },
  { label: "Slug", accessor: "slug" },
  {
    label: "Created At",
    accessor: "created_at",
    render: formatDate,
  },
  {
    label: "Updated At",
    accessor: "updated_at",
    render: formatDate,
  },
];



// ------------------------ Users Configuration ------------------------
export const userFields = [
  {
    name: "fullname",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Enter user name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "user@example.com",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: [
      { value: "user", label: "User" },
      { value: "author", label: "Author" },
      { value: "editor", label: "Editor" },
      { value: "admin", label: "Admin" },
      { value: "superadmin", label: "Super Admin" },
    ],
  },
];

export const userColumns = [
  { label: "Name", accessor: "fullname", filterable: true },
  { label: "Email", accessor: "email" },
  { label: "Role", accessor: "role" },
  { label: "status", accessor: "status" },
  {
    label: "Joined",
    accessor: "created_at",
    render: formatDate,
  },
];

export const articleColumns = [
  {
    label: "Title",
    accessor: "title",
    filterable: true,
  },

  {
    label: "Category",
    accessor: "category",
    render: (val) => val?.name || "—",
    filterable: true,
  },

  {
    label: "Author",
    accessor: "createdBy",
    render: (val) => val?.fullname || "—",
    filterable: true,
  },

  {
    label: "Status",
    accessor: "status",
    render: (val) => {
      const statusColors = {
        published: "bg-green-100 text-green-800",
        pending: "bg-blue-100 text-blue-800",
        draft: "bg-yellow-100 text-yellow-800",
        archived: "bg-gray-100 text-gray-800",
        scheduled: "bg-purple-100 text-purple-800",
      };

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[val] || "bg-gray-100 text-gray-800"
          }`}
        >
          {val || "draft"}
        </span>
      );
    },
    filterable: true,
  },

  {
    label: "Featured",
    accessor: "is_featured",
    render: (val) => (val ? "Yes" : "No"),
  },

  {
    label: "Breaking",
    accessor: "is_breaking_news",
    render: (val) => (val ? "Yes" : "No"),
  },

  {
    label: "Reads",
    accessor: "total_reads",
    render: (val) => val ?? 0,
  },

  {
    label: "Likes",
    accessor: "total_likes",
    render: (val) => val ?? 0,
  },

  {
    label: "Shares",
    accessor: "total_shares",
    render: (val) => val ?? 0,
  },

  {
    label: "Comments",
    accessor: "total_comments",
    render: (val) => val ?? 0,
  },

  {
    label: "Published At",
    accessor: "published_at",
    render: (val) => {
      if (!val) return "—";

      const date = new Date(val);

      return isNaN(date)
        ? "Invalid Date"
        : format(date, "PPP");
    },
  },

  {
    label: "Created At",
    accessor: "created_at",
    render: (val) => {
      if (!val) return "—";

      const date = new Date(val);

      return isNaN(date)
        ? "Invalid Date"
        : format(date, "PPP");
    },
  },

  {
    label: "Updated At",
    accessor: "updated_at",
    render: (val) => {
      if (!val) return "—";

      const date = new Date(val);

      return isNaN(date)
        ? "Invalid Date"
        : format(date, "PPP");
    },
  },
];
export const articleFields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    required: true,
    placeholder: "Enter article title",
    colSpan: 2,
  },

  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    colSpan: 1,
  },

  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    colSpan: 1,
    options: [
      {
        value: "draft",
        label: "Draft",
      },
      {
        value: "published",
        label: "Published",
      },
      {
        value: "archived",
        label: "Archived",
      },
      {
        value: "scheduled",
        label: "Scheduled",
      },
      {
        value: "pending",
        label: "Pending",
      },
    ],
  },

  {
    name: "image",
    label: "Featured Image",
    type: "file",
    accept: "image/*",
    colSpan: 1,
  },

  {
    name: "video",
    label: "Article Video",
    type: "file",
    accept: "video/*",
    colSpan: 1,
  },

  {
    name: "excerpt",
    label: "Excerpt",
    type: "textarea",
    rows: 4,
    placeholder: "Leave empty to generate automatically",
    colSpan: 2,
  },

  {
    name: "is_featured",
    label: "Featured Article",
    type: "checkbox",
    colSpan: 1,
  },

  {
    name: "is_breaking_news",
    label: "Breaking News",
    type: "checkbox",
    colSpan: 1,
  },

  {
    name: "published_at",
    label: "Published At",
    type: "datetime-local",
    colSpan: 1,
  },

  {
    name: "expiry_date",
    label: "Expiry Date",
    type: "datetime-local",
    colSpan: 1,
  },

  {
    name: "content",
    label: "Content",
    type: "editor",
    required: true,
    colSpan: 2,
  },
];


// ------------------------ Export all configs ------------------------
export const configs = {
  categories: {
    fields: categoryFields,
    columns: categoryColumns,
    service: "/categories",
    linkUrl: "/admin/sub-categories",
  },
 
  users: {
    fields: userFields,
    columns: userColumns,
    service: "/users",
    linkUrl: "null"
  },
  articles: {  // ← Add this
    fields: articleFields,
    columns: articleColumns,
    service: "/articles",
    linkUrl: null,
  }
};

export const socialFields = [
  {
    name: 'socialmediaimage',
    label: "Icon",
    accessor: "socialmediaimage",
    type: "file", // For image URL input
  },
  {
    name: "link",
    label: "Link",
    accessor: "link",
    type: "text", // For text input
  },
  {
    name: "platform",
    label: "Platform",
    accessor: "platform",
    type: "text", // For text input
  },
];

export const userRoleFeild = [

  {
    name: "role",
    label: "Role",
    type: "checkbox",
    required: true,
    message:
      "Are you sure you want to give access to this user for manage articles?",





  },
];
