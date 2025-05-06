import BreadCrumb from "@/app/common/BreadCrumb";
import Articles from "@/app/components/articles/Articles";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Articles />
    </div>
  );
};

export default page;
