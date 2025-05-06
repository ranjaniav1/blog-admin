import BreadCrumb from "@/app/common/BreadCrumb";
import TopCategories from "@/app/components/dashboard/TopCategories";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <TopCategories showUpdatedAt bgPrimary showAddButton />
    </div>
  );
};

export default Page;
