import React from "react";
import BreadCrumb from "@/app/common/BreadCrumb";
import SubCategoryData from "@/app/components/sub-categories/SubCategoryData";

const page = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <BreadCrumb
        items={[
          { label: "Home", href: "/dashboard" },
          { label: "Sub Category", href: "/admin/sub-categories" }, // You can use dynamic routing too
        ]}
      />
      <SubCategoryData bgPrimary requiredAllCategory />
    </div>
  );
};

export default page;
