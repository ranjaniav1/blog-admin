"use client";

import React from "react";
import { useParams } from "next/navigation";
import BreadCrumb from "@/app/common/BreadCrumb";
import SubCategoryData from "@/app/components/sub-categories/SubCategoryData";

const page = () => {
  const { category_id, category_slug } = useParams();
  console.log(category_slug);
  return (
    <div className="flex flex-col gap-4 p-4">
      <BreadCrumb
        items={[
          { label: "Home", href: "/dashboard" },
          { label: "Category", href: "/admin/categories" }, // You can use dynamic routing too
          { label: category_slug, href: `/admin/sub-categories/${category_slug}` }, // You can use dynamic routing too
        ]}
      />
      <SubCategoryData
        categorySlug={category_slug}
        showAddButton
        requiredAllCategory={false}
      />
    </div>
  );
};

export default page;
