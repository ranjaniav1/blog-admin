import BreadCrumb from "@/app/common/BreadCrumb";
import Users from "@/app/components/user/Users";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col p-4 gap-4">
      <Users />
    </div>
  );
};

export default page;
