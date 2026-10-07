// app/admin/[entity]/page.jsx
"use client";
import { useParams } from "next/navigation";
import UniversalCrudPage from "@/app/common/UniversalCrudPage";
import { configs } from "@/app/config/admin.config";

// Import all hooks
import { useCategories } from "@/app/hooks/useCategories";
import { useArticles } from "@/app/hooks/useArticles";
import { useUsers } from "@/app/hooks/useUsers";



// Map entity to hook
const hookMap = {
  categories: useCategories,
  articles:useArticles,
  users:useUsers,
};

// Map entity to title
const titleMap = {
  categories: "Category",
  articles:"Articles",
  users:"Users"
};

const DynamicCrudPage = () => {
  const { entity } = useParams();

  const config = configs[entity];
  const useCrudHook = hookMap[entity];
  const title = titleMap[entity];
  // Entities that don't have updated_at field
  const noUpdatedAtEntities = ["tags", "users"];

  if (!config || !useCrudHook) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Invalid Entity</h2>
        <p className="mt-2">The entity "{entity}" does not exist</p>
      </div>
    );
  }

  return (
    <UniversalCrudPage
      title={title}
      columns={config.columns}
      fields={config.fields}
      useCrudHook={useCrudHook}
      linkUrl={config.linkUrl}
      showUpdatedAt={!noUpdatedAtEntities.includes(entity)} />
  );
};

export default DynamicCrudPage;