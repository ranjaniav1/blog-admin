import BreadCrumb from "@/app/common/BreadCrumb";
import Tags from "@/app/components/tags/Tags";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Tags bgPrimary />
    </div>
  );
};

export default page;
