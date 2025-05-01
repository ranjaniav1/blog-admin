"use client";

import React, { useState } from "react";
import BreadCrumb from "@/app/common/BreadCrumb";
import SubCategories from "@/app/components/sub-categories/SubCategories";

const page = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <BreadCrumb
        items={[
          { label: "Home", href: "/dashboard" },
          { label: "Sub Category", href: "/admin/sub-categories" }, // You can use dynamic routing too
        ]}
      />
      <SubCategories bgPrimary showAddButton />
    </div>
  );
};

export default page;
