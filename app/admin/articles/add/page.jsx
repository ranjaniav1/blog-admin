import BreadCrumb from "@/app/common/BreadCrumb";
import ArticleForm from "@/app/components/articles/ArticleForm";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <BreadCrumb
        items={[
          { label: "Home", href: "/dashboard" },
          { label: "Articles", href: "/admin/articles" },
          { label: "Add Articles", href: "/admin/articles/add" },
        ]}
      />

      <ArticleForm />
    </div>
  );
};

export default page;
