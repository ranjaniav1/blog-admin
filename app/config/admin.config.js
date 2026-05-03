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
    title: "Subcategories",
    slug: "/admin/sub-categories",
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
    allowedRoles: ["superadmin", "admin", "author"],
  },
  {
    title: "Series",
    slug: "/admin/series",
    icon: FaBook,
    section: "Learning Management",
    description: "Manage learning series like Python, JS, etc.",
    allowedRoles: ["superadmin", "admin", "editor"],
  },
  {
    title: "Lessons",
    slug: "/admin/lessons",
    icon: FaLayerGroup,
    section: "Learning Management",
    description: "Create and manage lessons inside a series.",
    allowedRoles: ["superadmin", "admin", "editor", "author"],
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

export const Webname = "ENews";
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

// ------------------------ Subcategories Configuration ------------------------
export const subcategoryFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Enter subcategory name",
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
  {
    name: "category_id",
    label: "Category",
    type: "select",
    required: true,
  },
];

export const subcategoryColumns = [
  { label: "Name", accessor: "name", filterable: true },
  { label: "Slug", accessor: "slug" },
  {
    label: "Category",
    accessor: "category",
    render: (val) => val?.slug || val, filterable: true
  },
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

// ------------------------ Tags Configuration ------------------------
export const tagFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Enter tag name",
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    required: true,
    placeholder: "Enter slug",
  },
];

export const tagColumns = [
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

// ------------------------ Series Configuration ------------------------
export const seriesFields = [
  {
    name: "name",
    label: "Series Name",
    type: "text",
    required: true,
    placeholder: "Enter series name (e.g. Python Basics)",
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    required: true,
    placeholder: "python-basics",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: false,
    placeholder: "Short description",
  },
  {
    name: "image",
    label: "Thumbnail",
    type: "file",
  },
];

export const seriesColumns = [
  { label: "Name", accessor: "name", filterable: true },
  { label: "Slug", accessor: "slug" },
  {
    label: "Lessons",
    accessor: "lessons",
    render: (val) => val?.length || 0,
  },
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

// ------------------------ Lessons Configuration ------------------------
export const lessonFields = [
  {
    name: "title",
    label: "Lesson Title",
    type: "text",
    required: true,
    placeholder: "Enter lesson title",
    rows:1
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    required: true,
    placeholder: "lesson-slug",
    rows:1
  },
  {
    name: "seriesId",
    label: "Series",
    type: "select",
    required: true,
  },
  {
    name: "content",
    label: "Content",
    type: "editor",
    required: true,
  },
  {
    name: "thumbnail",
    label: "Thumbnail",
    type: "file",
  },
];

export const lessonColumns = [
  { label: "Title", accessor: "title", filterable: true },
  { label: "Slug", accessor: "slug" },
  {
    label: "Content",
    accessor: "content",
    render: (val) => {
      // Strip HTML and truncate for table view
      const plainText = val?.replace(/<[^>]*>/g, '') || '';
      return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
    },
  },
  {
    label: "Series",
    accessor: "series",
    render: (val) => val?.name || val, filterable: true
  },
  {
    label: "Order",
    accessor: "order",
  },
  {
    label: "Excerpt",
    accessor: "excerpt",
  },
  {
    label: "Created At",
    accessor: "created_at",
    render: formatDate,
  },
  {
    label: "Updated At",
    accessor: "updated_at",
    render: formatDate,
  }, {
    label: "Status",
    accessor: "isPublished",
    filterable: true
  },
];

// ------------------------ Users Configuration ------------------------
export const userFields = [
  {
    name: "name",
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
  { label: "Title", accessor: "title", filterable: true },
  { label: "Slug", accessor: "slug" },
  {
    label: "Category",
    accessor: "category",
    render: (val) => val?.name || "—",
    filterable: true,
  },
  {
    label: "Status",
    accessor: "status",
    render: (val) => {
      const statusColors = {
        published: "bg-green-100 text-green-800",
        draft: "bg-yellow-100 text-yellow-800",
        archived: "bg-gray-100 text-gray-800",
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[val] || statusColors.draft}`}>
          {val || "Draft"}
        </span>
      );
    },
    filterable: true,
  },
  {
    label: "Views",
    accessor: "views",
    render: (val) => val || 0,
  },
  {
    label: "Created At",
    accessor: "created_at",
    render: (val) => {
      const date = new Date(val);
      return isNaN(date) ? "Invalid Date" : format(date, "PPP");
    },
  },
  {
    label: "Updated At",
    accessor: "updated_at",
    render: (val) => {
      const date = new Date(val);
      return isNaN(date) ? "Invalid Date" : format(date, "PPP");
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
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    required: true,
    placeholder: "enter-article-slug",
  },
  {
    name: "content",
    label: "Content",
    type: "textarea",
    required: true,
    placeholder: "Write your article content here...",
    rows: 10,
  },
  {
    name: "excerpt",
    label: "Excerpt",
    type: "textarea",
    required: false,
    placeholder: "Short description of the article",
    rows: 3,
  },
  {
    name: "category_id",
    label: "Category",
    type: "select",
    required: true,
  },
  {
    name: "subcategory_id",
    label: "Subcategory",
    type: "select",
    required: false,
  },
  {
    name: "tags",
    label: "Tags",
    type: "select",
    required: false,
    isMulti: true,
  },
  {
    name: "image",
    label: "Featured Image",
    type: "file",
    required: false,
    accept: "image/*",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { value: "draft", label: "Draft" },
      { value: "published", label: "Published" },
      { value: "archived", label: "Archived" },
    ],
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
  "sub-categories": {
    fields: subcategoryFields,
    columns: subcategoryColumns,
    service: "/sub-categories",
  },
  tags: {
    fields: tagFields,
    columns: tagColumns,
    service: "/tags",
    linkUrl: "null"
  },
  series: {
    fields: seriesFields,
    columns: seriesColumns,
    service: "/series",
    linkUrl: "null"
  },
  lessons: {
    fields: lessonFields,
    columns: lessonColumns,
    service: "/lessons",
    linkUrl: "null"
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