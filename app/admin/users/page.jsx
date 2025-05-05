import BreadCrumb from "@/app/common/BreadCrumb";
import Users from "@/app/components/user/Users";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col p-4 gap-4">
      <BreadCrumb
        items={[
          { label: "Home", href: "/dashboard" },
          { label: "Users", href: "/admin/users" }, // You can use dynamic routing too
        ]}
      />

      <Users />
    </div>
  );
};

export default page;
