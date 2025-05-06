import React from "react";
import BreadCrumb from "@/app/common/BreadCrumb";
import SubCategoryData from "@/app/components/sub-categories/SubCategoryData";

const page = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <SubCategoryData bgPrimary requiredAllCategory />
    </div>
  );
};

export default page;
