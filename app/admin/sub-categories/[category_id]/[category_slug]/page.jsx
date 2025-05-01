"use client";

import React from "react";
import { useParams } from "next/navigation";
import SubCategoryData from "@/app/components/sub-categories/SubCategoryData";
import BreadCrumb from "@/app/common/BreadCrumb";

const page = () => {
  const { category_id, category_slug } = useParams();
  console.log(category_id);
  return (
    <div className="flex flex-col gap-4 p-4">
      <BreadCrumb
        items={[
          { label: "Home", href: "/dashboard" },
          { label: "Category", href: "/admin/categories" }, // You can use dynamic routing too
          { label: category_slug, href: `/admin/sub-categories/${category_id}` }, // You can use dynamic routing too
        ]}
      />
      <SubCategoryData
        categoryId={category_id}
        showAddButton
        requiredAllCategory={false}
      />
    </div>
  );
};

export default page;
